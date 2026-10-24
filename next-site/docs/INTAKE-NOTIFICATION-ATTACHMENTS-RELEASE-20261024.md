# 通知與附件正式啟用｜2026-10-24

網站保留原表單、Sitemap 4.0、首頁、Banner、CSS 與品牌素材。既有六類業務洽詢改接 n8n v2，資料與附件存入原 Smartsheet 主表的對應列；確認收件後，通知公司窗口 Hanson.lin@hansondm.com。不另寄填表者，不轉寄洽詢原文或附件。

## 正式版本

- 正式表單：https://www.hansondm.com/contact/#inquiry；合作：https://www.hansondm.com/partnerships/#proposal。
- 功能版本 `0a4911ad4a1d09f3a0306362f2888977ff810ab6`，Actions [40048112615](https://github.com/HansonDM/website/actions/runs/40048112615) 成功。
- FAQ／郵箱身分核對修正 `b02d19719fce43c73887a61e570192f1e7aaf122`，Actions [40049827654](https://github.com/HansonDM/website/actions/runs/40049827654) 的 build、deploy 成功。最終文件同步版本另見本機彙整 JSON。
- 正式流程 `YjX4Kcv7gOJFTiVV` Published，`production-v2` 設定 enabled=true；公開 GET ready=true，附件 enabled=true，公司通知 true、填表者通知 false。
- 告知版本 `2026-10-24-v2` 已公開，仍 noindex/nofollow；文章初稿維持 noindex。保存原則與 Hanson.lin@hansondm.com 資料處理窗口依使用者指定，未承諾自動刪除排程。
- 舊流程 `WT6L0GNOSPuP5eme` 已解除發布，保留原流程、列及收據。解除後舊 URL GET 實際回 HTTP500（n8n 錯誤頁），不是預期404；未把500當正常收件或404證據。新入口正常，網站只指向 v2。
- 私有驗證與管理者設定流程均只有 Manual Trigger，未發布、沒有公開測試 Webhook。三個新流程都已設定不保存成功／錯誤／手動執行原文及執行進度，逾時100秒；匯出完整來源核對通過。

## 附件與通知行為

PDF／PNG／JPG，最多3個、合計5MB。前後端核對類型、大小、檔名、base64及檔頭；不宣稱病毒掃描。附件不公開、不入站內搜尋或AI，也不作郵件附件。伺服器先持久保留待處理意向，再上傳一次，記錄附件ID並讀回名稱／父列／MIME／大小，全部確認後回201。未知狀態回202並保留原UUID，不能換編號盲目重傳。

公司通知使用既有 Outlook 連線，正文只含收件編號、主題、附件數與需登入的 Smartsheet 連結。持久記錄草稿 ImmutableId 後只交寄一次，讀回寄件備份；不以 Graph202宣稱送達。本輪另以公司「收件匣」實際郵件核對送達，並確認重送沒有新增通知。通知異常不否定已確認的表單收件；mail_unknown 應查原信件，不能直接建立新信重寄。

## 已完成驗證

- 142項離線測試通過；Node與Pages正式編譯通過。
- 新附件介面8項、原表單27項受控驗證通過，涵蓋1440px／390px、超量拒絕、待確認狀態、能力關閉與重新整理。受控回應不是遠端寫入證據。
- 靜態103項、正式站103項與SEO63項通過。回歸套件無表單POST；沒有對啟用中的正式站執行舊「預期停用」POST套件。
- 私有管理者實測一筆合成收件，19欄、3類附件逐筆核對，下載SHA256與原檔一致；公司收件匣一封通知。同UUID重跑仍一列、三附件、同一封信。
- 正式網站電腦1440px／手機390px各一筆合成收件：一筆PDF、一筆PNG及JPG，皆201且UUID相符；逐筆19欄、唯一列及下載SHA256一致。欄位清空、回執與重新整理不再POST通過。
- 兩筆正式測試各一封公司收件匣通知，沒有郵件附件。同UUID及原檔重放後仍原列、原附件數、同一封收件信；沒有新增郵件或列。
- 所有合成資料均標記「串接測試（勿聯絡）」／「合成測試」／example.com，不當作客戶需求。沒有使用客戶檔案。
- 三組正式站電腦／手機畫面已檢視；預覽 `artifacts/intake-v2-live-preview.html`，圖片 `artifacts/intake-v2-live-*-desktop-mobile.png`。使用者驗收尚待確認。

本機明細：`intake-v2-public-browser-verification.json`、`intake-v2-public-attachments-1440.json`、`intake-v2-public-attachments-390.json`、`intake-v2-public-replay.json`、`intake-v2-public-mail-replay.json`、`intake-v2-private-attachment-readback.json`、`intake-v2-private-mail-replay.json`、`intake-v2-live-pages-verification.json`、`intake-v2-live-seo-verification.json`。含私有郵件識別碼的驗證明細不放進公開網站或部署來源包。

## 修復、維運與回退

首次設定曾因 GET /me 缺 User.Read 回403；改用既有 Mail.ReadWrite 可讀的寄件備份核對，不擴大OAuth。原SMTP核對在Exchange回X500時擋住切換，改採已核實的Graph郵箱ID，加入拒絕錯誤ID反例。UI匯入不帶執行保存設定，已逐項設定並匯出核對，沒有僅憑Published視為驗收。本輪新建API金鑰0，既有已撤銷建置金鑰維持撤銷，其他專案設定不修改。

緊急先將網站專用config表的唯一 `production-v2` 設為 enabled=false，保留receipt／gate／附件／列，核對未知狀態後處理。前端回退基準為 `f491d348fbf38eb5d6bd8dd9404257a76c1bdc60`；需要恢復v1時須先核對告知版本、舊流程與開關，不自動重啟。不得直接刪鎖或換UUID重送。

20筆新收件／分鐘及1500ms間隔沿用，不能宣稱阻擋所有Cloud執行額度濫用。需持續管理n8n與Smartsheet容量、權限及人工清理；尚未啟用填表者確認信、預約／名額保留、會員或行銷訂閱。
