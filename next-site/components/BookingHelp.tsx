import {SectionHeading} from './InteriorUI';
export default function BookingHelp(){return <section id="booking-help" className="interior-section" aria-labelledby="booking-help-title">
 <div id="booking-help-title"><SectionHeading eyebrow="YOUR APPOINTMENT, STEP BY STEP" title="從預約確認，到改期與取消。" description="先保存申請編號，再依最新信件與網頁結果辦理；單純開啟連結不會異動預約。"/></div>
 <div className="faq-list">
  <details id="booking-help-confirmation"><summary><span>怎麼確認已經預約成功？</span><span aria-hidden="true">＋</span></summary><div><p>選擇時段並送出後，先查看預約驗證信，再按「確認預約信箱」。驗證前不保留時段；系統會重新核對公司行事曆，網頁結果顯示預約成功，才代表行事曆已確認。若仍在核對中，請保留原編號，使用「查核本次預約結果」，不要重複申請。</p><p>預約確認信會提供時間與私人管理連結。交流每次30分鐘，採台灣時間；線上會議連結由窗口另行提供。預約不等於付費服務或課程報名，也不會自動加入課程訂閱。</p></div></details>
  <details id="booking-help-changes"><summary><span>如何改期或取消？</span><span aria-hidden="true">＋</span></summary><div><p>開啟最新預約確認信或改期信的管理連結，先按「讀取我的預約」，再選擇新時段並確認改期，或明確按下取消。開啟信件連結與讀取資料，都不會自動改期或取消。</p><p>須距開始至少24小時才能線上異動；不足24小時請聯絡窗口協調。改期會更新同一筆預約，核對完成後才以新時間為準；取消也須核對完成才釋出時段。改期後請使用最新通知信，避免使用已失效的舊管理連結。</p></div></details>
  <details id="booking-help-mail"><summary><span>沒有收到信，或網頁仍顯示待查核？</span><span aria-hidden="true">＋</span></summary><div><p>請先查看垃圾郵件與信箱輸入是否正確，並保留原申請編號。寄送、信箱實際收到，以及行事曆確認是不同結果；沒有收到信不代表可以重複送出。網頁的查核只讀取結果，不會補寄或重新預約。</p><p>若仍無法確認，請將申請編號提供給 Hanson.lin@hansondm.com，由窗口核對；不需要寄出完整需求或附件，也請勿轉傳私人驗證或管理連結。驗證連結24小時內有效，過期或失效時可向窗口確認後續方式。</p></div></details>
  <details id="booking-help-availability"><summary><span>重新查詢後沒有時段，原本填的內容會保留嗎？</span><span aria-hidden="true">＋</span></summary><div><p>若本頁原先已有可約表單，重新查詢後暫無時段或暫時無法確認，已填信箱與同意勾選會留在本頁，送出會先停用；原選時段不再可用時，需重新選擇，不會自動換成其他時間。一般洽詢仍可使用。</p><p>這些未送內容只留在本頁記憶體，重新整理或離開頁面後不會保存。查詢時段不會保留時間；完成驗證後仍須再次核對行事曆。若已送出而結果不明，請先查核原編號，不要重新送出。</p></div></details>
 </div>
 <aside className="content-note">預約協助窗口：<a href="mailto:Hanson.lin@hansondm.com">Hanson.lin@hansondm.com</a>。<a href="/privacy/#appointments">閱讀線上預約資料告知 →</a> <a href="#online-booking">返回線上預約 →</a></aside>
 </section>}
