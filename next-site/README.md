# 韓森網站正式內容版本

Next.js App Router、TypeScript、Tailwind。沿用核可首頁與Sitemap。匿名公司專案及顧問歷任題材分區，客戶Logo與成果數字不展示。

GitHub Pages構建環境：DEPLOY_TARGET=github-pages、CASE_CONTENT_MODE=anonymous、CASE_PREVIEW_ENABLED=false、WEBSITE_RELEASE_MODE=production、NEXT_PUBLIC_STATIC_SITE=true、SMARTSHEET_SUBMISSIONS_ENABLED=false。

`pnpm install --frozen-lockfile && pnpm build`輸出out/；.github/workflows/deploy.yml負責Pages發布。API不隨靜態版本部署；網站表單改接n8n Cloud，使用NEXT_PUBLIC_INTAKE_API_URL指定已驗證的正式Webhook。接收開關由n8n網站專用設定控制，靜態intake-status.json保持false作為未配置時的關閉備援。權杖僅存n8nCredentials，不進Pages。文章初稿與資料告知保持noindex。通知附件與填表者確認信版本使用 /webhook/hanson-website-intake-v3，附件存對應Smartsheet列，公司窗口與填表者通知經既有Outlook連線寄送；見docs/INTAKE-VISITOR-CONFIRMATION.md。

現行表單提供10秒狀態檢查與手動GET恢復，保留未送文字／附件；見docs/INTAKE-AVAILABILITY.md。現行聯絡頁提供收件與確認信說明及三種空白聯絡範本，privacy提供資料權利聯絡範本；草稿、複製與下載均不寄信、不讀表單資料，見docs/FOLLOW-UP-TEMPLATES-20261024.md。現行聯絡頁提供收件與確認信說明；release-status.json及既有部署後site-health.cjs只讀核對版本、能力、sitemap與noindex，不寄信或寫資料，見docs/SITE-SUPPORT-OPERATIONS.md。

課程通知採獨立信箱驗證、僅通知已公告課程、每封可退訂；新公開 API 以 NEXT_PUBLIC_PARTICIPATION_API_URL 指向 n8n，功能開放狀態另由後端旗標核對。原洽詢 v3、附件及雙方通知保持不變。尚無開放課程，正式報名尚未開放。線上預約採獨立 NEXT_PUBLIC_BOOKING_API_URL，由公司主行事曆核對，開放狀態以正式後端為準。詳見 docs/SUBSCRIPTION-NOTICES-20261025.md。
