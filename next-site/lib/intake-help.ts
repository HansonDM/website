/** Public help only: never include receipts, sheet links, personal data or credentials. */
export const intakeHelpHref='/contact/#receipt-help';
export const intakeHelp=[
 {id:'receipt',question:'如何確認需求已送達？',answer:'填寫前若無法確認接收狀態，可選「重新確認接收狀態」；這只查詢系統狀態，不會送出需求，也不需重新整理或重填。請以表單顯示「已確認收到您的需求」及送出編號為準，並複製保存編號。若顯示「送出狀態待確認」，請保留同一編號交由窗口核對，勿重複送出相同需求。收件不代表已完成預約、報名或保留名額。'},
 {id:'email',question:'已確認收件，卻沒有收到確認信怎麼辦？',answer:'確認信可能稍後送達，請先查看垃圾郵件與其他分類，並確認填寫的信箱。郵件未收到不代表需求未收件，請勿為了收信重複送出。可來信提供送出編號，讓窗口協助核對；確認信不附需求原文、附件或內部工作表連結。'},
 {id:'limits',question:'短時間提交多筆需求，會每筆都收到確認信嗎？',answer:'為避免重複寄信，同一填寫信箱的確認信有間隔與每日上限；短時間連續送出可能不再寄送確認信，收件仍以網頁回執為準。這項限制不會將已確認的需求取消，公司窗口仍依收件流程處理。舊收件不會補寄確認信。'},
 {id:'attachments',question:'附件可以上傳什麼？會出現在確認信裡嗎？',answer:'表單接收狀態允許時，可上傳 PDF、PNG 或 JPG，最多 3 個，合計 5 MB。附件存入該筆需求的私有收件紀錄，不會附在公司通知或填表者確認信中，也不會加入網站搜尋。需要更換檔案時，可用「移除已選附件」清除本頁選擇；這不會刪除已收件的附件。請勿上傳不必要的個人資料或未經授權的機密檔案。'},
 {id:'follow-up',question:'送出後如何補充、更正或查詢資料？',answer:'請透過下方公開聯絡信箱提供送出編號及要處理的事項，由窗口核對後協助補充、更正、查詢或刪除。請勿在公開社群貼出需求原文、附件或他人資料；來信不需重新寄送全部附件。實際交流時間與服務安排另由雙方確認。'},
] as const;
export const intakeHelpSearchText=intakeHelp.map(item=>item.question+' '+item.answer).join(' ');
