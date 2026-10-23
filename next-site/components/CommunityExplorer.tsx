'use client';
import {useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {communityTopics,communityTopic,communityHref,communityInquiryHref,communityResources} from '@/lib/community-content';

export default function CommunityExplorer(){
 const query=useSearchParams(),themes=query.getAll('theme'),topic=communityTopic(themes.length===1?themes[0]:undefined)??communityTopics[0];
 const[note,setNote]=useState(''),[shareUrl,setShareUrl]=useState('');
 const select=(id:string)=>{window.history.replaceState(null,'',communityHref(id));setNote('');setShareUrl('');};
 return <section className="interior-section community-explorer" id="topics"><div className="interior-section-heading"><p className="eyebrow">START WITH A SHARED QUESTION</p><h2>從一個共同關心的主題，開始交流。</h2><p>先閱讀、再整理情境，找到與企業現況相關的服務與學習方向。</p></div>
  <div className="filter-row community-topic-picker" role="group" aria-label="社群交流主題">{communityTopics.map(t=><button type="button" aria-pressed={topic.id===t.id} onClick={()=>select(t.id)} key={t.id}>{t.title}</button>)}</div>
  <article className="community-topic-intro" aria-label="目前交流主題"><div><p className="eyebrow">{topic.en}</p><h3>{topic.title}</h3><p className="community-topic-lead">{topic.intro}</p>{topic.paragraphs.map(p=><p key={p}>{p}</p>)}</div><aside><h4>交流前，可以先想想</h4><ol>{topic.prompts.map(p=><li key={p}>{p}</li>)}</ol><p className="notice">可先整理工作情境，個人或機密內容請留待確認分享範圍後再討論。</p></aside></article>
  <div className="community-resource-heading"><h3>沿著這個主題，接著閱讀。</h3><p>文章保留初稿標示；服務與課程為規劃說明，實際安排依需求確認。</p></div>
  <div className="article-grid community-resources">{communityResources(topic.id).map(p=>{const href=`/${p.parent}/${p.slug}`,banner=p.kind==='article'?(p.topic==='AI 數位轉型'?'ai-transformation':p.topic==='人才資產發展'?'talent-development':'academy'):p.parent;return <article className="article-card" key={href}><Link className="article-cover" href={href} tabIndex={-1} aria-hidden="true"><img src={`/banners/${banner}.jpg`} alt="" width={1774} height={887} loading="lazy"/></Link><div><p className="category-label">{p.kind==='article'?'文章 · 內容初稿':p.kind==='course'?'企業內訓 · 規劃方向':'服務規劃說明'}</p><h3><Link href={href}>{p.title}</Link></h3><p>{p.intro}</p><Link className="detail-link" href={href}>{p.kind==='article'?'閱讀主題文章':p.kind==='course'?'查看內訓規劃':'了解服務方向'} →</Link></div></article>;})}</div>
  <div className="community-topic-actions"><Link className="button gold-button" href={communityInquiryHref(topic.id)}>以這個主題交流 →</Link><button className="receipt-action" type="button" onClick={async()=>{const url=new URL(communityHref(topic.id),window.location.origin).href;setShareUrl(url);try{await navigator.clipboard.writeText(url);setNote('主題網址已複製，只包含公開主題代號。');}catch{setNote('請複製下方主題網址。');}}}>複製主題網址</button></div>
  <p className="notice" role="status">{note}</p>{shareUrl&&<label className="comparison-share">主題網址<input readOnly value={shareUrl} onFocus={e=>e.target.select()}/></label>}
  <p className="notice">選擇主題與閱讀不會訂閱通知或送出需求。要進一步交流，請至洽詢頁確認接收狀態。</p>
 </section>;
}
