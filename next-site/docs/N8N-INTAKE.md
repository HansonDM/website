# 網站表單 → n8n Cloud → Smartsheet｜2026-10-24

> 最新v3（2026-10-24）：使用者核可公司窗口＋填表者確認信，已啟用 /webhook/hanson-website-intake-v3，告知2026-10-24-v3，流程MOdhBrzFTPz265IG。下方公司窗口限定／v2為歷史版本；以 INTAKE-VISITOR-CONFIRMATION.md 與 intake-v3-release-evidence.json 為準。

## 最新：通知與附件（2026-10-24）

原網站表單已改用 n8n v2；附件存入原 Smartsheet 對應列，確認收件後通知 Hanson.lin@hansondm.com。PDF／PNG／JPG，最多3個、合計5MB；不向填表者寄信，不隨信轉寄原文或檔案。正式流程YjX4Kcv7gOJFTiVV，設定key=production-v2，告知2026-10-24-v2。原首頁與Sitemap保持。最新發布、雙尺寸實測與維運見 docs/INTAKE-NOTIFICATION-ATTACHMENTS-RELEASE-20261024.md；下方v1狀態屬歷史紀錄。

以下說明保留 v1 建置歷史；現行通知附件細節另見 INTAKE-NOTIFICATION-ATTACHMENTS.md。

使用者已核可保留網站表單、改由 n8n Cloud 接收。此方案取代上一階段 Render 建議；不新購主機、不更動首頁／Sitemap／網域、不另建 Smartsheet 主表。

## 資源與處理

- n8n 實例：https://hansondm.app.n8n.cloud，已實際登入與 API 驗證；版本2.43.7。
- 正式流程：韓森網站｜正式收件｜Smartsheet v1，ID WT6L0GNOSPuP5eme。
- 正式端點：https://hansondm.app.n8n.cloud/webhook/hanson-website-intake-v1 （GET 狀態、POST 洽詢）。
- 受控驗證流程：韓森網站｜受控驗證｜Smartsheet v1，ID 4qu20FWX3p4ypXB8。入口有獨立 Header Auth，僅接收明確標示的合成資料；驗收後停用，不向訪客提供。
- 三張新 Data Tables：Hanson_Website_Intake_gate_20261024、Hanson_Website_Intake_receipts_20261024、Hanson_Website_Intake_config_20261024。沒有改動既有專案資料表。
- 兩份新專用 Header Auth 憑證：韓森網站｜Smartsheet 收件 API、韓森網站｜受控驗證入口。Smartsheet 沿用已授權的本機權杖；不修改既有 CJIC／Mindy 憑證。權杖只保存在 n8n Credentials，沒有放入工作流程JSON、Pages、文件或前端。
- 工作流程成功／錯誤／手動執行的原文保存均關閉。收件原文寫入既有 Smartsheet 主表；防重表只保留 UUID、雜湊、列ID、狀態、持有人及告知版本，不保存姓名、信箱或摘要。

正式流程初始 published但config.enabled=false，待網站告知與編譯版本發布、讀回通過後才改為true。最後實際狀態以本輪發布紀錄為準，不以本文件的準備步驟宣稱已啟用。

## 防重與回覆

1. 核對 Origin 為 https://www.hansondm.com、JSON大小24KB、必填／誘捕欄位、六類主題、條件欄位、告知版本與接收設定。
2. 對預先建立的單列 gate，以 owner=''、phase='free' 的條件更新取得處理權。原子更新與持有人讀回通過才繼續。已實測8個並行競爭者僅1個取得鎖，錯誤持有人無法釋放。
3. 在鎖內查詢 UUID。相同內容返回原結果；不同雜湊409；pending返回202，不重新寫入。
4. 新送出受持久全站限額20筆／分鐘及1500ms間隔控制。它限制進入Smartsheet的新收件，不代表所有對Cloud的無效請求都不會消耗執行額度。CORS不是身分驗證，伺服器另驗證Origin與欄位。
5. 核對主表19個接收欄位後，先保存pending紀錄，再呼叫一次 Smartsheet Add Rows；不開啟HTTP節點自動重試。
6. 保存列ID，讀回同列19欄全部相符，再將receipt標為received。只有確認後回201；不確定一律202。
7. 只釋放本次執行持有的鎖。流程中斷或鎖無法核對時不自動過期／換編號重送；需窗口先核對工作表與執行狀態後修復。這是安全優先的序列接收，沒有宣稱多主機恰好一次或自動修復所有中斷。

N8n HTTP Request的raw本文／文字回應在此版本對Add Rows出現stream序列化異常，曾回pending而實際已寫入。已改成JSON本文與JSON回應；columnId以字串傳遞並經實際API驗證接受，原值不經浮點轉換。JSON回應中的數字識別碼若不在安全整數範圍則拒絕確認，保留pending，不能猜測已四捨五入的列ID。GET文字回應仍保留int64轉換。

本輪六筆先前pending合成列，已用UUID找到唯一原列，核對原內容雜湊、告知版本與19欄後，人工更新其收據；沒有重新POST或刪列。證據見 n8n-intake-test-reconciliation.json。另有一筆刻意建立的無遠端列pending收據用於驗證不重送，保留測試標記，不作真人需求。

## 政策與啟用

- 保存原則來自使用者：「暫時沒有期限，以空間為主」。不自行指定年限；資料於洽詢及業務聯繫必要範圍保存，清理與權利申請由公開窗口人工依法辦理，沒有宣稱已建立自動刪除排程。
- 公開聯絡與處理窗口：Hanson.lin@hansondm.com。
- 告知版本2026-10-24-v1。資料地區：n8n官方說明Cloud主機及平台資料於歐盟；Smartsheet官方說明smartsheet.com為美國區，已核對指定主表使用該區的網址及API。不是只從本機SMARTSHEET_REGION變數猜測。告知另說明供應商支援及子處理者可能跨境處理，不虛構資料僅限單一國家。
- /privacy 作正式告知，仍保持noindex；三篇文章保持原初稿與noindex，不因本次收件而核定內容。

官方來源（本輪已核對）：
- https://n8n.io/legal/security/
- https://n8n.io/legal/sub-processors/
- https://help.smartsheet.com/articles/2483116-data-residency
- https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
- https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/

## 維運

- 現行v2在config表只找key=production-v2的單列；v1的production不是目前的正式入口。緊急關閉設enabled=false；GET即回ready=false，POST503，不需等待Pages重建。不要改validation列作正式告知。
- 主表的「串接測試（勿聯絡）」、合成公司與@example.com資料均為測試，不能聯絡或計作客戶成果。一般正式資料狀態為新洽詢；伺服器忽略訪客自行指定的status。
- 收件不代表預約、報名、候補、合作核准或通知送達；本流程沒有寄信、LINE、行銷或外部AI節點。
- 清理資料前先核對需求處理／權利申請與必要留存。不得只刪pending收據再重送；不得把私有防重表或Smartsheet內容加入公開搜尋。
- 監看Cloud執行額度與Data Tables容量；若流量超出目前序列收件設計，再另行規劃入口驗證與擴充，不逕自加購方案或放寬鎖定。
- 本次建置用短效n8n API金鑰將於交付前刪除；網站執行依賴工作流程與Smartsheet專用憑證，不依賴此建置金鑰。
