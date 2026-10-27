// Public, previously approved guide topics only; never read submissions, receipts or private tokens.
export const siteHelpLinks=[
 {id:'inquiry',parent:'contact',title:'洽詢收件與附件說明',href:'/contact/#receipt-help',terms:'洽詢 收件確認 確認信 附件 PDF PNG JPG 未收到信 待確認 查核編號'},
 {id:'booking',parent:'contact',title:'預約、改期與取消',href:'/contact/#booking-help',terms:'線上預約 預約成功 信箱驗證 驗證信箱 時段查詢 改期 取消預約 未收到預約確認信'},
 {id:'subscription',parent:'academy',title:'課程通知驗證與退訂',href:'/academy/#subscription-help',terms:'課程通知 訂閱 信箱驗證 驗證信箱 驗證信 未收到驗證信 退訂 停止課程通知 關注主題'},
] as const;
export function siteHelpSearchText(parent:string){return siteHelpLinks.filter(link=>link.parent===parent).map(link=>link.title+' '+link.terms).join(' ')}
