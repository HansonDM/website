// Pure decisions shared by the n8n builder and offline tests; no network or secrets.
const effects=require('./n8n-intake-effects.cjs');const {parseAttachments}=effects;
function answer(ctx,code,status,message){return {...ctx,proceed:false,reply:{code,body:{status,...(ctx.input?{submissionId:ctx.input.submissionId}:{}),message}}};}
function readiness(config,policy,mode){return !!config&&config.enabled===true&&config.noticePublished===true&&typeof config.noticeVersion==='string'&&!!config.noticeVersion&&config.noticeUrl==='https://www.hansondm.com/privacy/'&&(mode==='validation'||policy.published===true&&policy.version===config.noticeVersion&&['retention','contact','region','access'].every(k=>typeof policy[k]==='string'&&!!policy[k].trim()&&!/待定|待確認|待補/.test(policy[k])))&&Number.isInteger(config.maxPerMinute)&&config.maxPerMinute>=1&&config.maxPerMinute<=100&&Number.isInteger(config.minIntervalMs)&&config.minIntervalMs>=0;}
function validate(envelope,config,policy,mode,owner,normalize){
 let ctx={owner:String(owner),ownsLock:false,proceed:false,config};
 if(envelope.headers?.origin!=='https://www.hansondm.com')return answer(ctx,403,'rejected','無法驗證送出來源，請由網站表單重新送出。');
 if(!readiness(config,policy,mode))return answer(ctx,503,'unavailable','洽詢接收尚未啟用，本次資料未儲存、未送出。');
 if(!/^application\/json(?:\s*;|$)/i.test(envelope.headers?.['content-type']||''))return answer(ctx,415,'rejected','資料格式錯誤。');
 const body=envelope.body||{},small={...body};delete small.attachments;if(Buffer.byteLength(JSON.stringify(small),'utf8')>24000||Buffer.byteLength(JSON.stringify(body),'utf8')>7100000)return answer(ctx,413,'rejected','內容或附件過大，請縮減後再送出。');
 try{ctx.attachments=parseAttachments(body.attachments).map(({content,...metadata})=>metadata);}catch{return answer(ctx,400,'rejected','附件限 PDF、PNG、JPG，最多 3 個、合計 5 MB；請確認檔案與檔名。');}
 try{ctx.input=normalize(envelope.body);}catch{return answer(ctx,400,'rejected','請確認必填欄位、電子郵件、需求內容與資料使用同意。');}
 if(envelope.body.consentVersion!==config.noticeVersion)return answer(ctx,409,'notice_changed','資料使用告知已更新，請重新整理並閱讀最新內容後再送出。');
 if(mode==='validation'&&(!ctx.input.name.includes('串接測試（勿聯絡）')||!ctx.input.email.endsWith('@example.com')||ctx.input.company!=='合成測試'))return answer(ctx,400,'rejected','此入口僅供受控合成驗證，不接收真實洽詢。');
 return {...ctx,proceed:true};
}
function claim(ctx,rows,now){
 const locks=rows.filter(r=>r&&String(r.owner)===ctx.owner&&r.phase==='held');
 if(locks.length!==1)return answer(ctx,429,'unavailable','目前有其他需求正在處理，請稍後再試。');
 const lock=locks[0];return {...ctx,ownsLock:true,lock,now,proceed:true};
}
function priorReceipt(ctx,rows){
 const receipts=rows.filter(r=>r?.submissionId===ctx.input.submissionId);if(receipts.length>1)return answer(ctx,202,'pending_verification','收件紀錄需核對，請保留原編號，避免重複送出。');
 if(!receipts.length)return {...ctx,proceed:true};const prior=receipts[0];if(prior.fingerprint!==ctx.fingerprint)return answer(ctx,409,'conflicting_submission','送出編號已使用，請保留原編號並確認原次送出狀態。');
 return answer(ctx,prior.status==='received'?201:202,prior.status==='received'?'received':'pending_verification',prior.status==='received'?'已確認收到您的需求；本次收件不代表完成預約或報名。':'原次送出狀態待確認，請保留原編號，避免重複送出。');
}
function rate(ctx){const l=ctx.lock,reset=ctx.now-Number(l.windowStart)>=60000,start=reset?ctx.now:Number(l.windowStart),count=reset?0:Number(l.windowCount);
 if(!Number.isFinite(start)||!Number.isFinite(count)||count>=ctx.config.maxPerMinute||ctx.now<Number(l.availableAt))return answer(ctx,429,'unavailable','目前接收量較大，請稍後再試。');
 return {...ctx,windowStart:start,windowCount:count+1,availableAt:ctx.now+ctx.config.minIntervalMs,proceed:true};
}
function parseRemote(packet){
 if(!Number.isInteger(packet?.statusCode)||packet.statusCode<200||packet.statusCode>=300)throw Error('UPSTREAM_RESPONSE');
 const raw=packet.body!==undefined?packet.body:packet.data;
 if(typeof raw==='string')return JSON.parse(raw.replace(/"(id|columnId|rowId|sheetId|parentId)"\s*:\s*(\d+)/g,(_,key,value)=>'"'+key+'":"'+value+'"'));
 const visit=value=>{if(Array.isArray(value))return value.map(visit);if(value&&typeof value==='object'){if('_readableState'in value||'_events'in value)throw Error('STREAM_RESPONSE');return Object.fromEntries(Object.entries(value).map(([k,v])=>{if(['id','columnId','rowId','sheetId','parentId'].includes(k)&&typeof v==='number'){if(!Number.isSafeInteger(v))throw Error('UNSAFE_IDENTIFIER');return[k,String(v)];}return[k,visit(v)];}));}return value;};
 if(!raw||typeof raw!=='object')throw Error('UPSTREAM_RESPONSE');return visit(raw);
}
function prepare(ctx,packet,schema,formType,mode){
 try{const remote=parseRemote(packet).data;if(!Array.isArray(remote))throw Error('SCHEMA');const ids={};for(const c of schema){const matches=remote.filter(r=>r.title===c.title&&r.type===c.type&&/^\d+$/.test(String(r.id)));if(matches.length!==1)throw Error('SCHEMA');ids[c.key]=String(matches[0].id);}
 const values={...ctx.input,formType:formType(ctx.input.topic),consentVersion:ctx.config.noticeVersion,submittedAt:new Date(ctx.now).toISOString(),status:mode==='validation'||ctx.input.name.includes('串接測試（勿聯絡）')&&ctx.input.company==='合成測試'?'串接測試（勿聯絡）':'新洽詢'};
 const expected=schema.map(c=>({columnId:ids[c.key],value:values[c.key]??''}));const body='[{"cells":['+expected.map(c=>'{"columnId":'+c.columnId+',"value":'+JSON.stringify(c.value)+',"strict":true}').join(',')+']}]';return {...ctx,expected,body,postBody:[{cells:expected.map(c=>({...c,strict:true}))}],proceed:true};
 }catch{const result=answer(ctx,503,'unavailable','接收欄位尚未完成核對，本次資料未寫入。');if(mode==='validation')result.reply.body.diagnostic={keys:Object.keys(packet||{}),statusCode:packet?.statusCode,bodyType:typeof packet?.body,bodyKeys:packet?.body&&typeof packet.body==='object'?Object.keys(packet.body):[],dataType:typeof packet?.data,errorType:typeof packet?.error};return result;}
}
function claimedReceipt(ctx,rows){const found=rows.filter(r=>r?.submissionId===ctx.input.submissionId&&r.owner===ctx.owner&&r.fingerprint===ctx.fingerprint&&r.status==='pending_verification');if(found.length!==1)return answer(ctx,202,'pending_verification','收件紀錄需核對，請保留編號，避免重複送出。');return {...ctx,receiptId:found[0].id,proceed:true};}
function wrote(ctx,packet){try{const data=parseRemote(packet),row=Array.isArray(data.result)?data.result[0]:data.result;if(data.resultCode!==0||!/^\d+$/.test(String(row?.id)))throw Error('WRITE');return {...ctx,rowId:String(row.id),proceed:true};}catch{const result=answer(ctx,202,'pending_verification','接收狀態尚待確認，請保留送出編號，避免重複送出。');if(ctx.config.key==='validation'){let data;try{data=parseRemote(packet)}catch{}result.reply.body.diagnostic={keys:Object.keys(packet||{}),statusCode:packet?.statusCode,errorType:typeof packet?.error,dataPrefix:typeof packet?.data==='string'?packet.data.slice(0,180):'',errorSummary:typeof packet?.error==='string'?packet.error.replace(/Bearer\s+\S+/ig,'[REDACTED]').replace(/[A-Za-z0-9_-]{24,}/g,'[REDACTED]').slice(0,200):'',errorCode:data?.errorCode,resultCode:data?.resultCode,errorMessage:data?.message,results:Array.isArray(data?.result)?data.result.length:typeof data?.result};}return result;}}
function verify(ctx,packet){try{const row=parseRemote(packet);if(String(row.id)!==ctx.rowId||!Array.isArray(row.cells))throw Error('ROW');for(const expected of ctx.expected){const actual=row.cells.filter(c=>String(c.columnId)===expected.columnId);if(actual.length!==1||(actual[0].value??'')!==expected.value)throw Error('CELL');}return {...ctx,proceed:true};}catch{return answer(ctx,202,'pending_verification','資料已送交接收服務，欄位核對尚待確認；請保留編號，避免重複送出。');}}
function completed(ctx,rows){const ok=rows.length===1&&rows[0].status==='received'&&rows[0].rowId===ctx.rowId&&rows[0].owner===ctx.owner;return answer(ctx,ok?201:202,ok?'received':'pending_verification',ok?'已收到您的需求，後續將依聯絡資訊與您確認；本次送出尚不代表完成預約。':'收件確認紀錄需核對，請保留編號，避免重複送出。');}
module.exports={...effects,answer,readiness,validate,claim,priorReceipt,rate,parseRemote,prepare,claimedReceipt,wrote,verify,completed};
