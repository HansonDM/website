# 公司窗口與填表者確認信｜2026-10-24

使用者回覆核可「公司窗口＋填表者收件確認信」，取代先前公司窗口限定設定。網站仍維持 Sitemap 4.0、首頁與既有版型；所有既有六類表單共用同一收件流程，沒有新增報名或預約成功承諾。

## 行為與資料告知

正式收件、19欄及附件全部核對後，先回網頁收件編號，再依序處理公司通知及填表者確認信。公司通知寄 Hanson.lin@hansondm.com，保留原最少資訊及需登入的工作表入口。填表者確認信寄本次表單電子郵件，只含收件編號、後續聯繫說明與公司公開回覆信箱，不含姓名、公司、電話、需求原文、附件、檔名或私有工作表連結。不新增行銷訂閱，不向先前歷史收件補寄。

前端依正式能力顯示寄信說明；顯示收件成功不代表郵件已送達，也不代表完成預約、報名或保留名額。未收到信仍可保留網頁編號聯絡公司窗口，不能為收信換編號盲目重送。正式資料告知版本為2026-10-24-v3，仍noindex/nofollow；文章初稿維持原設定。

## 防重與寄信額度

兩封信各自使用 `UUID:notification:owner` 與 `UUID:notification:visitor` 持久意向。先在原全站鎖內保留，再於HTTP回執後建立草稿、保存ImmutableId、交寄一次及讀回寄件備份。任何未知結果標記mail_unknown待人工核對，不自動建立第二封郵件。公司信失敗或未保留不阻止已保留的填表者信；反之亦然，寄信結果不改寫已核對的核心收件。

填表者另有每信箱60秒間隔、台灣每日最多5封的保護上限；只保存信箱SHA256、計數及時間，沿用網站私有receipts表，不另建收件表或保存明文信箱。額度在同一全站鎖內保留並讀回，讀回異常不寄填表者信；洽詢仍正常收件並通知公司。被限制的意向標記mail_suppressed，原因為recipient_cooldown、recipient_daily_limit或budget_unverified，不能把它當成已寄送。

## 版本與維運

- 正式Webhook為 `/webhook/hanson-website-intake-v3`，設定key為production-v3；驗證key為validation-v3。舊版端點只作回退參考，不自動恢復。
- 來源：scripts/n8n-intake-v3-workflow.cjs、n8n-intake-visitor.cjs、n8n-intake-v3-setup.cjs、n8n-intake-v3-validation.cjs。
- 所有新流程不保存成功、錯誤、手動執行原文與執行進度，逾時100秒。管理者驗證僅Manual Trigger，不提供公開測試Webhook。維持原Smartsheet主表、附件規則及既有Outlook連線，不新增OAuth權限或API金鑰。
- UI匯入後需個別設定保存旗標及逾時，匯出按已知原生預設還原後，完整核對節點、條件、憑證引用與連線。不能僅以Published判斷通過。
- 緊急先將production-v3設定enabled=false，保留鎖、收據與原列。先核對郵件ID、寄件備份與收件匣，未知不得換UUID／刪紀錄重送。回退前先核對資料告知與端點版本。

## 本階段驗證狀態

已正式啟用：流程MOdhBrzFTPz265IG、設定production-v3 enabled=true，公開能力owner=true、visitor=true，正式告知v3已讀回。功能版本c3face04dd6eaad2f5de7acedf4bb8aa9fdf1acb，Actions40056800659成功；舊v2已解除發布，保留原資料。149項離線、Node與Pages編譯、103靜態路由及63SEO通過。私有合成一筆確認19欄與三檔SHA256，公司Outlook及填表者自有Gmail均實際收件；原編號重跑仍各一封。正式電腦／手機各一筆201，19欄與附件原檔雜湊核對，兩類通知已實際收件。新增雙尺寸舊回執相容守門：既有回執繼續可讀，只有新收件保存的寄信能力旗標才顯示確認信說明，不對歷史資料補寄。最後部署與回歸彙整見本機docs/intake-v3-release-evidence.json，不在公開包收錄私人郵件識別碼。
