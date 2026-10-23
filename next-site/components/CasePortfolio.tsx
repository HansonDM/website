import Link from 'next/link';
import {EmptyState,SectionHeading} from './InteriorUI';
import {filterCasePreview,type CasePreviewEntry} from '@/lib/case-preview-model';
const serviceLabels:Record<string,string>={'/ai-transformation/industry-applications':'產業應用','/ai-transformation/service-process-projects':'客服、流程與專案管理','/ai-transformation/assistant':'AI 客服與知識助理','/ai-transformation/automation':'流程自動化','/ai-transformation/data':'數據應用','/academy':'企業學院','/academy/manager-communication':'主管溝通內訓','/talent-development/standards':'人才標準','/talent-development/organizational-diagnosis':'企業診斷與跨部門溝通','/talent-development/social-impact':'社會影響力'};
export default function CasePortfolio({entries,group,category}:{entries:CasePreviewEntry[];group:CasePreviewEntry['group'];category:string}){
 const items=filterCasePreview(entries,group,category),company=group==='company';
 return <section className="interior-section case-portfolio" id={company?'company-projects':'consultant-experience'}>
  <SectionHeading eyebrow={company?'COMPANY PROJECTS':'CONSULTANT EXPERIENCE'} title={company?'公司服務與專案規劃':'顧問歷任專案經驗'} description={company?'從企業課題出發，呈現顧問服務、規劃與協作的工作內容。':'呈現顧問於企業或服務供應商任職期間參與的專案；服務關係與公司直接受託專案分開說明。'}/>
  <p className="result-count" role="status">本分類 · {items.length} 項匿名{company?'專案題材':'歷任經驗題材'}</p>
  {items.length?<div className="article-grid case-portfolio-grid">{items.map(entry=><article className="article-card case-portfolio-card" key={entry.id} id={entry.id}>
   <span className="article-cover case-portfolio-cover"><img src={`/banners/${entry.categories.includes('talent')?'talent-development':entry.categories.includes('learning')?'academy':'ai-transformation'}.jpg`} alt="" width={1774} height={887} loading="lazy"/><small>情境示意</small></span>
   <div><p className="category-label">{entry.name} · {entry.status}</p><h3>{entry.title}</h3><p>{entry.summary}</p><p className="case-role">{entry.role}</p>
    <details className="case-portfolio-details"><summary>查看工作內容<span aria-hidden="true">＋</span></summary><div><ul>{entry.approach.map(point=><li key={point}>{point}</li>)}</ul><p>{entry.note}</p><div className="case-service-links">{entry.related.map(href=><Link className="detail-link" href={href} key={href}>了解{serviceLabels[href]??'相關服務'} →</Link>)}</div></div></details>
   </div></article>)}</div>:<EmptyState title={company?'此分類尚無公司專案題材':'此分類尚無顧問歷任題材'} text="可切回全部分類，查看其他匿名內容。"/>}
 </section>;
}
