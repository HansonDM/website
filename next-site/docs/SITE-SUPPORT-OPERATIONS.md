> 2026-10-27使用說明查找續階：site-health已擴充為9個公開GET，另核對課程訂閱及獨立線上預約的啟用／告知版本。空預約時段不當作停用；詳見下方更新及DISCOVERY-HEALTH-RELEASE-20261027.md。

# 收件說明與發布健康檢查｜2026-10-24

本輪只延伸既有聯絡頁及既有部署流程，保留Sitemap4.0、首頁、Banner、CSS、正式v3收件、附件及雙方通知。修正聯絡後續流程與學院討論單的過期「尚未接收／啟用後」描述，改依當下表單及回執確認。

## 收件後閱讀

/contact/#receipt-help的5則說明沿用faq-list原生details，無腳本可讀、可鍵盤開合。回執success／pending皆提供另開說明，不攜帶UUID或表單原文，保留原分頁狀態。可搜尋確認信、附件及待確認等字詞；仍使用原contact記錄，總數不變。

說明網頁回執與郵件的差異、垃圾郵件與信箱核對、寄信間隔、私有附件、人工補充／更正／刪除；不承諾郵件必達、回覆時限、預約或報名。舊回執不補寄，未知不重送。

## 公開版本與部署後唯讀檢查

release-status.json只輸出公開commit／run／builtAt、固定正式網域與收件入口、告知版本、39 sitemap URL及4 noindex URL；無個資、收據、權杖、全量環境或本機路徑。本機沒有CI值以null表示；CI缺GITHUB_SHA或RUN_ID則建置失敗。

site-health.cjs在既有deploy-pages步驟後執行，每次成功核對7個GET：版本、公開收件能力、sitemap及4 noindex頁。需SHA／run吻合，owner及visitor為true，附件3個5MB，v3告知相符。最多6次只讀重試容許CDN傳播。失敗使job失敗，但不自動回滾，應另看Pages實際發布與正式版本。沒有POST、通知、工作表讀寫、新排程或憑證。不能把能力旗標當郵件送達、附件E2E、持續監控或備份。

## 檔案及驗證

來源lib/intake-help.ts、components/IntakeHelp.tsx、scripts/release-status.cjs、scripts/site-health.cjs；部署allowlist及workflow同步更新。tests/site-health.test.cjs涵蓋錯版本、noindex、能力降級、外連拒絕、GET-only；tests/browser-intake-help.cjs在1440/390做原生／無腳本閱讀、鍵盤、success/pending另開與零POST。

此輪沒有改動n8n節點、Credentials、Smartsheet欄位、Data Tables或郵件模板；未重寄測試信。既有送達及防重證據仍見intake-v3-release-evidence.json。本輪發布、正式讀回及雙尺寸畫面另記SITE-SUPPORT-RELEASE-20261024.md。使用者驗收另計。

## 2026-10-27：三項業務入口的部署後檢查

現行site-health.cjs保留原release、v3收件、sitemap及四個noindex頁，另查公開subscription catalogue與獨立booking catalogue，合計9個GET。固定入口白名單、credentials omit、禁止redirect、無Authorization／表單本文、不讀收據或私人資料。

訂閱核對啟用、noticePublished、告知版本與網址及台灣時區，不把該服務的legacy bookingEnabled=false誤當新預約停用。獨立預約核對enabled、noticePublished、其獨立告知、24小時異動規則與30分鐘時段格式；時段空清單仍合法，不要求行事曆一定有空位。回報僅公開旗標、時段數、SHA／run及檢查數，不輸出客戶、表單、信件、日曆事件或憑證。

這是既有部署後檢查擴充，沒有新增排程、通知告警、寄信、備份或自動回滾。即使檢查失敗，Pages可能已完成部署，應讀回版本及CI結果處理；不可稱作尚未部署或自動回復。能力旗標仍不等於實際信件送達或新的端到端交易驗收。
