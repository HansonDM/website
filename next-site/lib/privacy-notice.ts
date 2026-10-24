/** Published from user-provided retention/contact and approved n8n workflow; see N8N-INTAKE.md. */
export const privacyNotice={
 published:true,
 version:'2026-10-24-v1',
 url:'/privacy',
 access:'由韓森管理顧問授權之需求處理與系統管理人員依職務需要存取。資料處理窗口：Hanson.lin@hansondm.com。n8n Cloud 與 Smartsheet 為本流程使用的雲端處理服務。',
 retention:'目前未設定固定保存年限，依儲存空間及實際業務需要管理，於回覆洽詢與後續業務聯繫所必要範圍內保存。利用目的消失或收到停止利用、刪除申請時，由處理窗口依法辦理；依法或業務上仍須保存的部分另行說明。',
 contact:'Hanson.lin@hansondm.com',
 region:'本流程使用 n8n Cloud（依供應商公告，雲端主機與平台資料位於歐盟）及 Smartsheet 美國資料區，並由韓森授權窗口處理需求。供應商的維運、支援及子處理者可能涉及其公告之跨境處理。',
};

/** A URL or environment flag alone is not a published business policy. */
export function publishedNoticeMatches(url:string,version:string){
 if(!/^(https:\/\/|\/(?!\/))/.test(url)||/\s/.test(url)||!privacyNotice.published||!version||privacyNotice.version!==version)return false;
 if([privacyNotice.retention,privacyNotice.contact,privacyNotice.region,privacyNotice.access].some(value=>!value.trim()||/待定|待確認|待補/.test(value)))return false;
 try{
  const base='https://www.hansondm.com',actual=new URL(url,base),approved=new URL(privacyNotice.url,base);
  return actual.protocol==='https:'&&!actual.username&&!actual.password&&!actual.search&&!actual.hash&&actual.origin===approved.origin&&actual.pathname.replace(/\/$/,'')===approved.pathname.replace(/\/$/,'');
 }catch{return false;}
}
