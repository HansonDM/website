# 韓森網站正式內容版本

Next.js App Router、TypeScript、Tailwind。沿用核可首頁與Sitemap。匿名公司專案及顧問歷任題材分區，客戶Logo與成果數字不展示。

GitHub Pages構建環境：DEPLOY_TARGET=github-pages、CASE_CONTENT_MODE=anonymous、CASE_PREVIEW_ENABLED=false、WEBSITE_RELEASE_MODE=production、NEXT_PUBLIC_STATIC_SITE=true、SMARTSHEET_SUBMISSIONS_ENABLED=false。

`pnpm install --frozen-lockfile && pnpm build`輸出out/；.github/workflows/deploy.yml負責Pages發布。API不隨靜態版本部署；網站表單改接n8n Cloud，使用NEXT_PUBLIC_INTAKE_API_URL指定已驗證的正式Webhook。接收開關由n8n網站專用設定控制，靜態intake-status.json保持false作為未配置時的關閉備援。權杖僅存n8nCredentials，不進Pages。文章初稿與資料告知保持noindex。
