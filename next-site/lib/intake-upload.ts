/** Transfer progress is distinct from server-side attachment storage and receipt confirmation. */
export function sendIntake(url:string,body:unknown,onProgress:(percent:number|null)=>void):Promise<Response>{
 return new Promise((resolve,reject)=>{
  const request=new XMLHttpRequest();request.open('POST',url);request.timeout=45_000;request.withCredentials=false;request.setRequestHeader('Content-Type','application/json');
  request.upload.onprogress=event=>onProgress(event.lengthComputable?Math.min(100,Math.round(event.loaded/event.total*100)):null);
  request.upload.onload=()=>onProgress(100);
  request.onload=()=>{if(request.status<200||request.status>599){reject(Error('Transfer outcome unknown'));return;}resolve(new Response(request.responseText,{status:request.status}));};
  request.onerror=()=>reject(Error('Transfer outcome unknown'));request.ontimeout=()=>reject(Error('Transfer outcome unknown'));request.onabort=()=>reject(Error('Transfer outcome unknown'));
  request.send(JSON.stringify(body));
 });
}
