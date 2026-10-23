'use client';
import {useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {servicePlanner,planningOptions,parsePlanningFocus,planningSelection,planningHref,planningInquiryHref,planningBrief,planningLimit,type PlanningId} from '@/lib/service-planning';

export default function ServicePlanner({kind}:{kind:PlanningId}){
 const plan=servicePlanner(kind)!;const query=useSearchParams(),values=query.getAll('focus'),rawFocus=values.length===1?values[0]:'';const[selected,setSelected]=useState(()=>parsePlanningFocus(kind,rawFocus));
 useEffect(()=>{setSelected(parsePlanningFocus(kind,rawFocus));},[kind,rawFocus]);
 const[ready,setReady]=useState<string[]>([]),[show,setShow]=useState(selected.length>0),[note,setNote]=useState('');
 const chosen=planningSelection(kind,selected),remaining=plan.conditions.filter(c=>!ready.includes(c.id));
 const toggle=(slug:string)=>{const next=selected.includes(slug)?selected.filter(id=>id!==slug):selected.length<planningLimit?[...selected,slug]:selected;setSelected(next);window.history.replaceState(null,'',planningHref(kind,next));setNote('');};
 const download=()=>{const url=URL.createObjectURL(new Blob(['\uFEFF'+planningBrief(kind,selected,ready)],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`韓森${plan.topic}需求討論單.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setNote('討論單已準備下載，尚未送出洽詢。');};
 return <div className="service-planner" data-planner={kind}><div className="interior-section-heading"><p className="eyebrow">{plan.en}</p><h2>{plan.title}</h2><p>{plan.intro}</p></div>
  <div className="planner-workspace"><div className="planner-questions"><fieldset className="planner-conditions"><legend>01　整理目前的準備事項</legend><p>勾選已整理的項目；其餘可留待交流時確認。</p>{plan.conditions.map(c=><label key={c.id}><input type="checkbox" checked={ready.includes(c.id)} onChange={e=>setReady(items=>e.target.checked?[...items,c.id]:items.filter(id=>id!==c.id))}/><span>{c.label}</span></label>)}</fieldset>
   <fieldset className="planner-focus"><legend>02　選擇想討論的服務方向</legend><p>可選一至三項，也可以先不選，從問題開始討論。</p><div>{planningOptions(kind).map(p=><label key={p.slug}><input type="checkbox" checked={selected.includes(p.slug)} disabled={!selected.includes(p.slug)&&selected.length>=planningLimit} onChange={()=>toggle(p.slug)}/><span>{p.title}</span></label>)}</div><p className="notice" role="status">已選 {selected.length}／{planningLimit} 項{selected.length===planningLimit?'；可先取消一項再選其他方向。':'。'}</p></fieldset>
   <div className="planner-actions"><button type="button" className="button teal-button" onClick={()=>setShow(true)}>查看整理建議 →</button><button type="button" className="receipt-action" onClick={()=>{setReady([]);setSelected([]);setShow(false);setNote('已清除本頁的準備事項與方向選擇。');window.history.replaceState(null,'',planningHref(kind));}}>清除本次整理</button></div>
  </div><aside className="planner-guidance"><p className="eyebrow">PREPARE FOR A CONVERSATION</p><h3>把現況說清楚，讓交流更有方向。</h3><p>這份整理協助你準備需求交流，不是正式成熟度評鑑或員工評量。</p><ul>{plan.prompts.map(p=><li key={p}>{p.replace(/：$/,'')}</li>)}</ul><p className="notice">準備事項只保留在本頁，重新整理後清空。網址只保留公開的服務方向，不包含勾選的準備事項。</p></aside></div>
  {show&&<section className="planner-result" aria-label="需求整理建議"><p className="eyebrow">YOUR DISCUSSION OUTLINE</p><h3>帶著這份整理，展開下一次討論。</h3><p className="planner-summary" role="status">已整理 {ready.length}／{plan.conditions.length} 項準備事項；{remaining.length?`其餘 ${remaining.length} 項可接著確認。`:'可接著對齊試行範圍、分工與回顧方式。'}</p>
   <div className="planner-next"><h4>{remaining.length?'接下來可以先準備':'交流時可以接著討論'}</h4><ul>{(remaining.length?remaining.map(c=>c.next):['先選定一個範圍清楚的課題，確認對象、分工與限制。','討論工作中的觀察與回顧方式，再規劃後續服務。']).map(s=><li key={s}>{s}</li>)}</ul></div>
   {chosen.length>0?<><h4>你選擇的服務方向</h4><div className="planner-services">{chosen.map(p=><article key={p.slug}><p className="category-label">服務規劃說明</p><h4>{p.title}</h4><p>{p.intro}</p><Link className="detail-link" href={`/${p.parent}/${p.slug}`}>閱讀完整服務說明 →</Link></article>)}</div></>:<p>尚未選定服務方向，也可以先帶著現況與我們討論。</p>}
   <div className="planner-actions"><Link className="button gold-button" href={planningInquiryHref(kind,selected)}>帶入服務方向洽詢 →</Link><button type="button" className="receipt-action" onClick={download}>下載需求討論單</button></div><p className="notice">洽詢頁只帶入服務方向，不包含準備事項。下載不會送出資料，實際服務內容依需求確認。</p>
  </section>}
  <p className="notice" role="status">{note}</p>
 </div>;
}
