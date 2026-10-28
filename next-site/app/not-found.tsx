import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import {pageMetadata} from '@/lib/site-metadata';
import {siteHelpLinks} from '@/lib/site-help';
export const metadata=pageMetadata('/404');
export default function NotFound(){return <main id="main" className="interior-page not-found-page">
 <PageBanner page={{slug:'not-found',bannerSlug:'knowledge',title:'這個頁面目前找不到',en:'404 / FIND ANOTHER WAY',intro:'連結可能已變更。可以從服務總覽繼續探索，或到知識中心搜尋相關內容。'}}/>
 <div className="interior-body">
  <section className="interior-section" aria-labelledby="not-found-search-title">
   <div className="interior-section-heading"><h2 id="not-found-search-title">讓我們幫你找到下一步。</h2><p>用關鍵字找內容，或選擇下方方向繼續瀏覽。</p></div>
   <form role="search" aria-label="找回網站內容" className="site-search-form" action="/knowledge/#search" method="get">
    <label className="knowledge-search" htmlFor="not-found-query">想找哪個主題？<input id="not-found-query" type="search" name="q" maxLength={120} placeholder="例如：AI 數位轉型、內訓、取消預約" aria-describedby="not-found-search-note"/></label>
    <button className="button teal-button" type="submit">查找網站內容 →</button>
   </form>
   <p className="notice" id="not-found-search-note">搜尋關鍵字會保留在網址，請勿輸入信箱、申請編號或私人管理連結。</p>
   <noscript><p className="notice">查找會前往知識中心；未啟用 JavaScript 時，可直接閱讀公開內容，關鍵字篩選需啟用 JavaScript。</p></noscript>
   <div className="related-grid"><Link href="/ai-transformation">AI 數位轉型 <span>→</span></Link><Link href="/talent-development">人才資產發展 <span>→</span></Link><Link href="/academy">企業學院 <span>→</span></Link><Link href="/knowledge/#search">搜尋網站內容 <span>→</span></Link></div>
   <Link className="button gold-button" href="/">返回首頁 →</Link>
  </section>
  <section className="interior-section soft-panel" aria-labelledby="not-found-help-title" id="not-found-help">
   <div className="interior-section-heading"><h2 id="not-found-help-title">想了解申請後的操作方式？</h2><p>可先查看收件、預約與課程通知說明；若要驗證或管理申請，請使用原信件的完整連結。</p></div>
   <nav className="receipt-actions" aria-label="申請操作說明">{siteHelpLinks.map(link=><a key={link.id} className="receipt-action" href={link.href}>{link.title} →</a>)}</nav>
  </section>
 </div>
 </main>}
