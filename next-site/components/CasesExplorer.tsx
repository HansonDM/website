'use client';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import Link from 'next/link';
import CasePortfolio from './CasePortfolio';
import type {CasePreviewEntry} from '@/lib/case-preview-model';
import {EmptyState,SectionHeading} from './InteriorUI';
import {caseCategories,caseCategory,caseGuidesFor,casesHref} from '@/lib/case-guides';
import {caseTopicEntry} from '@/lib/case-preview-model';

export default function CasesExplorer({entries=[],previewMode=true}:{entries?:CasePreviewEntry[];previewMode?:boolean}){
 const params=useSearchParams(),values=params.getAll('category'),category=caseCategory(values.length===1?values[0]:undefined),guides=caseGuidesFor(category.id);
 useEffect(()=>{let frame=0;const reveal=()=>{let id='';try{id=decodeURIComponent(window.location.hash.slice(1));}catch{return;}if(!caseTopicEntry(id,entries))return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const card=document.getElementById(id),details=card?.querySelector('details');if(details){details.open=true;card?.scrollIntoView({block:'start',behavior:'instant'});}});};reveal();window.addEventListener('hashchange',reveal);return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',reveal);};},[entries,category.id]);
 return <><section id="stories" className="interior-section"><SectionHeading eyebrow="CLIENT STORIES" title="每一個故事，都從真實的企業課題開始。" description={entries.length?"以匿名專案與歷任經驗，了解不同企業情境下的工作切入方式。":"案例將依服務主題呈現，並於資料確認與客戶授權後上架。"}/><div className="filter-row" role="group" aria-label="案例服務分類">{caseCategories.map(c=><button type="button" aria-pressed={category.id===c.id} key={c.id} onClick={()=>window.history.replaceState(null,'',casesHref(c.id))}>{c.label}</button>)}</div><div role="status">{entries.length?<p className="content-note case-preview-note">{previewMode?'本機內容預覽：':''}公司專案與顧問歷任經驗以匿名情境分開呈現，保留各項工作角色與服務範圍。規劃與交付內容不等於已驗證的營運成效。</p>:<EmptyState title={category.id==='all'?'案例故事整理中':`${category.label}案例整理中`} text="經客戶授權並完成內容核實後，將分享企業課題、服務過程與可追溯的成果。目前不展示未經確認的客戶名稱、Logo、成果數字或見證。" icon="chart"/>}</div></section>
  {entries.length>0&&<><CasePortfolio entries={entries} group="company" category={category.id}/><CasePortfolio entries={entries} group="experience" category={category.id}/></>}
  <section id="case-guides" className="interior-section case-guides"><SectionHeading eyebrow="READING THE EVIDENCE" title="服務成果怎麼看？先從觀察指南開始。" description="從工作範圍、觀察依據與回顧方式，理解一項服務可能需要討論什麼。"/><p className="content-note">以下是服務成果的閱讀與討論參考，未包含客戶實績或成效數字。</p><p className="result-count" role="status">{category.id==='all'?'全部主題':category.label} · {guides.length} 份成果觀察指南</p><div className="article-grid case-guide-grid">{guides.map(guide=><article className="article-card" key={guide.slug}><Link href={`/cases/${guide.slug}`} className="article-cover" tabIndex={-1} aria-hidden="true"><img src={`/banners/${guide.topic==='AI 數位轉型'?'ai-transformation':guide.topic==='人才資產發展'?'talent-development':'academy'}.jpg`} alt="" width={1774} height={887} loading="lazy"/></Link><div><p className="category-label">{guide.topic} · 成果觀察指南</p><h3><Link href={`/cases/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.intro}</p><Link className="detail-link" href={`/cases/${guide.slug}`}>閱讀觀察指南 →</Link></div></article>)}</div><div className="case-guide-actions"><Link className="text-link" href="#stories">回到案例分類 ↑</Link>{category.id!=='all'&&<button type="button" className="receipt-action" onClick={()=>window.history.replaceState(null,'',casesHref('all','case-guides'))}>查看全部觀察指南</button>}</div></section>
 </>;
}
