import Link from 'next/link';
import {resolveInquiryContext} from '@/lib/inquiry-context';
import type {InquirySource} from '@/lib/inquiry-links';
export default function InquiryContext({topic,interest,from,comparison,planning,focus}:{topic?:string;interest?:string;from?:InquirySource;comparison?:string;planning?:string;focus?:string}){
 const context=resolveInquiryContext(topic,interest,from,comparison,planning,focus);if(!context.topic&&!context.interest)return null;
 return <aside className="inquiry-context" aria-label="本次洽詢方向"><p className="eyebrow">YOUR STARTING POINT</p><h3>從這個方向，接著聊。</h3><dl>{context.topic&&<div><dt>洽詢主題</dt><dd>{context.topic}</dd></div>}{context.interest&&<div><dt>關注方向</dt><dd>{context.interest}</dd></div>}</dl>{context.from==='community'&&<p>此方向來自社群主題內容，不代表已加入社群、訂閱通知或完成活動報名。</p>}{context.planning&&<p>來自服務需求整理，僅帶入公開服務方向；準備事項不會自動送出。可補充你願意分享的工作情境，服務內容仍依需求確認。</p>}{context.isCourse&&<p>這是企業內訓規劃方向；課綱、講師、時數與費用依需求確認，尚無公開班日期或保留名額。</p>}{context.isGuide&&<p>此方向來自成果觀察指南，可作為服務需求討論的起點；不代表特定客戶案例或固定成效。</p>}{context.isDraftArticle&&<p>此方向來自本站文章初稿，可作為需求討論的起點。</p>}<div className="inquiry-context-links">{context.source&&(context.from==='community'?<a href={context.source.href}>{context.source.label} ↗</a>:<Link href={context.source.href}>{context.source.label} ↗</Link>)}<Link href="/contact#inquiry">重新選擇洽詢方向</Link></div></aside>;
}
