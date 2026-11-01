import type {ContentDetail} from '@/lib/detail-content';

/** Only owner-approved editorial fields; review notes and internal approval records stay out. */
export default function ApprovedArticleBody({page}:{page:ContentDetail}){
 return <>
  {page.opening&&<div className="detail-text-section">{page.opening.map(text=><p key={text}>{text}</p>)}</div>}
  {page.sections.map((section,index)=><section className="detail-text-section" key={section.title} id={`article-section-${index+1}`}>
   <span className="detail-section-number">0{index+1}</span><h2>{section.title}</h2>
   {section.paragraphs?.map(text=><p key={text}>{text}</p>)}
   {section.bullets&&<ul>{section.bullets.map(text=><li key={text}>{text}</li>)}</ul>}
   {section.after?.map(text=><p key={text}>{text}</p>)}
  </section>)}
  <section className="detail-text-section detail-prepare" id="prepare"><h2>{page.exerciseTitle??'帶回工作：兩分鐘整理下一步'}</h2><ul>{page.prepare.map(text=><li key={text}>{text}</li>)}</ul></section>
  {page.cta&&<section className="detail-text-section"><h2>從閱讀走向行動</h2><p>{page.cta}</p></section>}
  {page.references&&<section className="detail-text-section"><h2>寫作參考</h2><ul>{page.references.map(reference=><li key={reference.number}><a className="detail-link" href={reference.url} target="_blank" rel="noopener noreferrer">[{reference.number}] {reference.title} ↗</a><p>{reference.note}</p></li>)}</ul></section>}
 </>;
}
