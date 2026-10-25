export const participationVersion='2026-10-25-participation-v1';
export const participationTopics=[{id:'ai',label:'AI 數位轉型'},{id:'talent',label:'人才資產發展'},{id:'leadership',label:'職涯領導力'},{id:'service',label:'客戶服務與流程'},{id:'project',label:'專案管理'},{id:'esg',label:'ESG 社會影響力'}] as const;
export type ParticipationSlot={id:string;start:string;end:string};
export type ParticipationCourse={id:string;title:string;description:string;location:string;start:string;end:string;closes:string;capacity:number;remaining:number;priceKind:'free'|'paid';admission:'direct'|'review';waitlist:boolean;bookable:boolean};
export type ParticipationCatalogue={version:string;timezone:'Asia/Taipei';noticePublished:boolean;noticeUrl:'/privacy/#participation';bookingEnabled:boolean;enrollmentEnabled:boolean;subscriptionEnabled:boolean;cancelHours:number|null;slots:ParticipationSlot[];courses:ParticipationCourse[];mode?:'local-validation'};
export type ParticipationResult={reference?:string;status:string;message:string};
export function participationEndpoint(value:unknown,localPreview=false){
 if(typeof value!=='string'||!value)return '';
 try{const u=new URL(value);if(u.username||u.password||u.search||u.hash)return '';
  if(u.origin==='https://hansondm.app.n8n.cloud'&&u.pathname==='/webhook/hanson-website-participation-v1')return u.href;
  if(localPreview&&u.origin==='http://127.0.0.1:3025'&&u.pathname==='/')return u.origin;
 }catch{}return '';
}
const instant=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v)&&Number.isFinite(Date.parse(v));
const id=(v:unknown)=>typeof v==='string'&&/^[a-z0-9-]{1,80}$/.test(v);
export function validParticipationCatalogue(value:unknown):value is ParticipationCatalogue{
 if(!value||typeof value!=='object')return false;const v=value as ParticipationCatalogue;
 if(v.version!==participationVersion||v.timezone!=='Asia/Taipei'||typeof v.bookingEnabled!=='boolean'||typeof v.enrollmentEnabled!=='boolean'||typeof v.subscriptionEnabled!=='boolean'||!Array.isArray(v.slots)||!Array.isArray(v.courses)||v.slots.length>300||v.courses.length>100)return false;
 if(v.noticeUrl!=='/privacy/#participation'||typeof v.noticePublished!=='boolean'||((v.bookingEnabled||v.enrollmentEnabled||v.subscriptionEnabled)&&!v.noticePublished))return false;
 if(v.bookingEnabled&&(!Number.isInteger(v.cancelHours)||Number(v.cancelHours)<0))return false;
 if(new Set(v.slots.map(s=>s?.id)).size!==v.slots.length||new Set(v.courses.map(c=>c?.id)).size!==v.courses.length)return false;
 return v.slots.every(s=>s&&id(s.id)&&instant(s.start)&&instant(s.end)&&Date.parse(s.start)<Date.parse(s.end))&&v.courses.every(c=>c&&id(c.id)&&typeof c.title==='string'&&c.title.length>0&&c.title.length<=180&&typeof c.description==='string'&&typeof c.location==='string'&&instant(c.start)&&instant(c.end)&&instant(c.closes)&&Number.isInteger(c.capacity)&&c.capacity>0&&Number.isInteger(c.remaining)&&c.remaining>=0&&c.remaining<=c.capacity&&['free','paid'].includes(c.priceKind)&&['direct','review'].includes(c.admission)&&typeof c.waitlist==='boolean'&&typeof c.bookable==='boolean'&&(!c.bookable||(c.priceKind==='free'&&c.admission==='direct')));
}
export const participationActions:Record<string,string>={'verify-booking':'驗證預約信箱','verify-enrollment':'驗證課程報名信箱','verify-subscription':'確認課程通知訂閱','unsubscribe':'停止課程通知','cancel-booking':'取消預約','cancel-enrollment':'取消報名或候補','accept-offer':'接受候補遞補名額'};
export function participationToken(hash:unknown){
 if(typeof hash!=='string')return null;const m=/^#participation\/([a-z-]+)\/([A-Za-z0-9_-]{43})$/.exec(hash);return m&&Object.hasOwn(participationActions,m[1])?{action:m[1],token:m[2]}:null;
}
export function participationTime(iso:string){return new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(iso));}
export function participationSavedId(value:unknown){
 if(typeof value!=='string')return '';try{const data=JSON.parse(value);return data&&Object.keys(data).length===1&&typeof data.requestId==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)?data.requestId:'';}catch{return '';}
}
