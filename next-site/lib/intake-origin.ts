/** Only configured origins are trusted; never infer trust from Host or forwarded headers. */
export function allowedIntakeOrigins(env:Record<string,string|undefined>=process.env){
 const origins=new Set<string>();
 for(const value of [env.NEXT_PUBLIC_SITE_URL,...(env.FORMS_ALLOWED_ORIGIN||'').split(',')]){
  if(!value?.trim())continue;
  try{const url=new URL(value.trim()),loopback=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
   if((url.protocol==='https:'||url.protocol==='http:'&&loopback)&&!url.username&&!url.password&&url.pathname==='/'&&!url.search&&!url.hash)origins.add(url.origin);
  }catch{/* Invalid configuration grants no access. */}
 }
 return origins;
}
export function trustedIntakeOrigin(request:Request){const origin=request.headers.get('origin');return origin&&allowedIntakeOrigins().has(origin)?origin:null;}
