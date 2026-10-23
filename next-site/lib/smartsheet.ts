import {createHash} from 'node:crypto';
import {columns,intakeColumns} from './smartsheet-schema';
import {formType,type Submission} from './form-fields';
import {claimJournal,completeJournal,journalPath,readJournal,type JournalRecord} from './intake-journal';
import {publishedNoticeMatches} from './privacy-notice';
const hosts={us:'https://api.smartsheet.com/2.0',eu:'https://api.smartsheet.eu/2.0',au:'https://api.smartsheet.au/2.0',gov:'https://api.smartsheetgov.com/2.0'};
export type IntakeConfig={enabled:boolean;token:string;sheetId:string;baseUrl:string;consentVersion:string;privacyNoticeUrl:string;journalDirectory?:string};
export function intakeConfig(env:Record<string,string|undefined>=process.env):IntakeConfig{
 const region=env.SMARTSHEET_REGION??'us',privacy=env.FORMS_PRIVACY_NOTICE_URL??'';
 return{enabled:env.SMARTSHEET_SUBMISSIONS_ENABLED==='true',token:env.SMARTSHEET_ACCESS_TOKEN??'',sheetId:env.SMARTSHEET_SHEET_ID??'',baseUrl:hosts[region as keyof typeof hosts]??'',consentVersion:env.FORMS_CONSENT_VERSION??'',privacyNoticeUrl:privacy,journalDirectory:env.FORMS_JOURNAL_DIRECTORY||'.data/intake'};
}
export function intakeReady(c:IntakeConfig){return c.enabled&&!!c.token&&/^\d+$/.test(c.sheetId)&&Object.values(hosts).includes(c.baseUrl)&&publishedNoticeMatches(c.privacyNoticeUrl,c.consentVersion);}
export class IntakeError extends Error{constructor(public status:number,public code:string,message:string){super(message);}}
/** Preserve int64 identifiers exactly before JavaScript can round numeric JSON values. */
export function parseSmartsheetJson(text:string){return JSON.parse(text.replace(/"(id|columnId|rowId|sheetId)"\s*:\s*(\d+)/g,(_,key,value)=>`"${key}":"${value}"`));}
type RemoteColumn={id:string;title:string;type:string};type Cell={columnId:string;value?:string|number|boolean};type Row={id:string;cells:Cell[]};
export type Receipt={submissionId:string;rowId:string;status:'received'|'pending_verification'};
type Entry={fingerprint:string;expires:number;promise:Promise<Receipt>};
// Coalesces concurrent requests; durable claims below protect across process restarts.
const entries=new Map<string,Entry>();
export function clearIntakeCacheForTests(){entries.clear();}
export async function sendToSmartsheet(input:Submission,config:IntakeConfig=intakeConfig(),fetcher:typeof fetch=fetch):Promise<Receipt>{
 if(!intakeReady(config))throw new IntakeError(503,'not_configured','洽詢接收尚未啟用，本次資料未儲存、未送出。');
 const now=Date.now();for(const[key,e]of entries)if(e.expires<now)entries.delete(key);
 const directory=config.journalDirectory||'.data/intake';
 const key=config.baseUrl+':'+config.sheetId+':'+input.submissionId,fingerprint=createHash('sha256').update(JSON.stringify({input,consentVersion:config.consentVersion})).digest('hex'),prior=entries.get(key);
 if(prior){if(prior.fingerprint!==fingerprint)throw new IntakeError(409,'conflicting_submission','送出編號已使用，請重新整理表單後再填寫。');return prior.promise;}
 if(entries.size>=1000)throw new IntakeError(429,'capacity','目前接收量較大，請稍後再試。');
 const request=async(path:string,init:RequestInit={})=>{const response=await fetcher(config.baseUrl+path,{...init,cache:'no-store',signal:AbortSignal.timeout(15000),headers:{Authorization:`Bearer ${config.token}`,'Content-Type':'application/json',...init.headers}});const raw=await response.text();if(!response.ok)throw new IntakeError(502,'upstream_error','接收服務暫時無法處理，請稍後再試。');return parseSmartsheetJson(raw);};
 const task=(async()=>{
  const path=journalPath(directory,key);
  const existingReceipt=(record:JournalRecord):Receipt=>{if(record.fingerprint!==fingerprint)throw new IntakeError(409,'conflicting_submission','送出編號已使用，請保留原編號並確認原次送出狀態。');return{submissionId:record.submissionId,rowId:record.rowId,status:record.status};};
  try{const priorRecord=await readJournal(path);if(priorRecord)return existingReceipt(priorRecord);}catch(error){if(error instanceof IntakeError)throw error;throw new IntakeError(503,'journal_unavailable','收件確認服務暫時無法使用，本次資料未寫入。');}
  let remote:RemoteColumn[];try{const response=await request(`/sheets/${config.sheetId}/columns`);remote=response.data;if(!Array.isArray(remote))throw Error('Invalid columns');}catch{throw new IntakeError(503,'schema_unavailable','表單接收服務暫時無法使用，本次資料未寫入。');}
  const ids=new Map<string,string>();for(const col of intakeColumns){const matches=remote.filter(c=>c.title===col.title&&c.type===col.type&&/^\d+$/.test(String(c.id)));if(matches.length!==1)throw new IntakeError(503,'schema_mismatch','接收欄位尚未完成設定，本次資料未寫入。');ids.set(col.key,String(matches[0].id));}
  const values:Record<string,string|boolean>={...input,formType:formType(input.topic),consentVersion:config.consentVersion,submittedAt:new Date().toISOString(),status:'新洽詢'};
  const expected=intakeColumns.map(col=>({columnId:ids.get(col.key)!,value:values[col.key]??''}));
  // Numeric identifiers are validated before serialization; literal JSON avoids int64 rounding.
  const body=`[{"cells":[${expected.map(c=>`{"columnId":${c.columnId},"value":${JSON.stringify(c.value)},"strict":true}`).join(',')}]}]`;
  const record:JournalRecord={fingerprint,submissionId:input.submissionId,rowId:'',status:'pending_verification'};
  try{if(!await claimJournal(directory,path,record)){const claimed=await readJournal(path);if(!claimed)throw Error('Claim unavailable');return existingReceipt(claimed);}}catch(error){if(error instanceof IntakeError)throw error;throw new IntakeError(503,'journal_unavailable','收件確認服務暫時無法使用，本次資料未寫入。');}
  let row:Row;try{const response=await request(`/sheets/${config.sheetId}/rows`,{method:'POST',body});if(response.resultCode!==0)throw Error('Not complete');row=Array.isArray(response.result)?response.result[0]:response.result;if(!row||!/^\d+$/.test(String(row.id)))throw Error('No row id');}catch{
   throw new IntakeError(202,'pending_verification','接收狀態尚待確認。請保留送出編號，避免重複送出。');
  }
  try{const readback:Row=await request(`/sheets/${config.sheetId}/rows/${row.id}`);if(String(readback.id)!==String(row.id))throw Error('Wrong row');for(const cell of expected){const actual=readback.cells.find(c=>String(c.columnId)===cell.columnId);if(!actual||(actual.value??'')!==cell.value)throw Error('Field mismatch');}await completeJournal(directory,path,{...record,rowId:String(row.id),status:'received'});return{submissionId:input.submissionId,rowId:String(row.id),status:'received' as const};}catch{return{submissionId:input.submissionId,rowId:String(row.id),status:'pending_verification' as const};}
 })();
 entries.set(key,{fingerprint,expires:now+24*60*60*1000,promise:task});
 try{return await task;}catch(error){if(!(error instanceof IntakeError&&error.code==='pending_verification'))entries.delete(key);throw error;}
}
export {columns};
