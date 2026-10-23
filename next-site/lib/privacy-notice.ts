/** Business policy is pending user input. Do not publish or invent these values. */
export const privacyNotice={
 published:false,
 version:'',
 url:'/privacy',
 access:'待確認：可存取洽詢資料的人員與職責。',
 retention:'待定：洽詢資料與收件追蹤紀錄的保存期限、到期處理方式。',
 contact:'待定：可公開的資料查詢、更正或刪除聯絡信箱。',
 region:'待確認：正式主機及 Smartsheet 帳戶適用的資料處理與儲存地區。',
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
