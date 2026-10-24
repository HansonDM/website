/** Build-time public URL only. No secrets or personal data belong in this setting. */
export function intakeEndpoint(configured=process.env.NEXT_PUBLIC_INTAKE_API_URL,staticSite=process.env.NEXT_PUBLIC_STATIC_SITE==='true'){
 if(!configured)return {status:staticSite?'/intake-status.json':'/api/inquiries',submit:'/api/inquiries'};
 try{const url=new URL(configured),loopback=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
  if((url.protocol==='https:'||url.protocol==='http:'&&loopback)&&!url.username&&!url.password&&!url.search&&!url.hash&&(url.pathname==='/api/inquiries'||url.hostname==='hansondm.app.n8n.cloud'&&url.pathname==='/webhook/hanson-website-intake-v1'))return {status:url.href,submit:url.href};
 }catch{/* Invalid endpoint fails closed rather than sending to another destination. */}
 return null;
}
