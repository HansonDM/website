/** Public GET capability only. Never accept or transmit form fields, files or receipt IDs. */
export const intakeCheckTimeoutMs=10_000;
export type IntakeAvailability={ready:boolean;privacy:string|null;consentVersion:string;attachmentsEnabled:boolean;visitorNotifications:boolean};
export function intakeAvailability(value:unknown):IntakeAvailability{
 const data=value&&typeof value==='object'?value as Record<string,unknown>:{};
 const consentVersion=typeof data.consentVersion==='string'&&data.consentVersion.trim().length<=80?data.consentVersion.trim():'';
 const ready=data.ready===true&&!!consentVersion;
 const privacy=typeof data.privacyNoticeUrl==='string'&&/^(https:\/\/|\/(?!\/))/.test(data.privacyNoticeUrl)&&!/[\s\\\u0000-\u001f]/.test(data.privacyNoticeUrl)?data.privacyNoticeUrl:null;
 return{ready,privacy,consentVersion,attachmentsEnabled:ready&&(data.attachments as {enabled?:unknown}|undefined)?.enabled===true,visitorNotifications:ready&&(data.notifications as {visitor?:unknown}|undefined)?.visitor===true};
}
export async function readIntakeAvailability(url:string,{signal,timeoutMs=intakeCheckTimeoutMs,fetcher=fetch}:{signal?:AbortSignal;timeoutMs?:number;fetcher?:typeof fetch}={}){
 if(signal?.aborted)throw Error('Intake status check cancelled');
 const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;let onAbort:()=>void=()=>{};
 try{
  const cancelled=new Promise<never>((_,reject)=>{
   onAbort=()=>{controller.abort();reject(new Error('Intake status check cancelled'));};
   if(signal?.aborted){onAbort();return;}signal?.addEventListener('abort',onAbort,{once:true});
   timer=setTimeout(()=>{controller.abort();reject(new Error('Intake status check timed out'));},timeoutMs);
  });
  const request=async()=>{const response=await fetcher(url,{method:'GET',cache:'no-store',credentials:'omit',signal:controller.signal});if(!response.ok)throw Error('Intake status unavailable');return intakeAvailability(await response.json());};
  return await Promise.race([cancelled,request()]);
 }finally{if(timer)clearTimeout(timer);signal?.removeEventListener('abort',onAbort);}
}
