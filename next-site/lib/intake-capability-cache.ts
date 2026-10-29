import {readIntakeAvailability,type IntakeAvailability} from './intake-availability';
// Public capabilities only, in module memory. No inputs, files, receipts or browser storage.
const ttl=30_000;
let cached:{url:string;value:IntakeAvailability;at:number}|null=null;
let running:{url:string;task:Promise<IntakeAvailability>}|null=null;
export function clearIntakeCapability(){cached=null;}
export async function intakeCapability(url:string,{fresh=false,signal}:{fresh?:boolean;signal?:AbortSignal}={}){
 if(signal?.aborted)throw Error('cancelled');
 const task=!fresh&&cached?.url===url&&Date.now()-cached.at<ttl?Promise.resolve(cached.value):running?.url===url?running.task:(()=>{
  const request=readIntakeAvailability(url).then(value=>{cached=value.ready?{url,value,at:Date.now()}:null;return value;},error=>{cached=null;throw error;}).finally(()=>{if(running?.task===request)running=null;});
  running={url,task:request};return request;
 })();
 if(!signal)return task;
 let cancel:()=>void=()=>{};
 try{return await Promise.race([task,new Promise<never>((_,reject)=>{cancel=()=>reject(Error('cancelled'));signal.addEventListener('abort',cancel,{once:true});if(signal.aborted)cancel();})]);}
 finally{signal.removeEventListener('abort',cancel);}
}
