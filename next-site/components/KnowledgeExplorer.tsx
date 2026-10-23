'use client';
import {useEffect,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {useKnowledgeQuery,useKnowledgeReady} from './KnowledgeQueryProvider';
import Link from 'next/link';
import {cleanSearchQuery} from '@/lib/site-search';
import {faqEntries,faqCategories,faqCategory,faqEntry,findFaqs,faqBrowseHref,faqQuestionHref} from '@/lib/faq-navigation';

export default function KnowledgeExplorer(){
 const ready=useKnowledgeReady(),router=useRouter(),params=useKnowledgeQuery(),one=(key:string)=>{const values=params.getAll(key);return values.length===1?values[0]:undefined;};
 const savedQuery=cleanSearchQuery(one('faq_q')),urlCategory=faqCategory(one('faq_topic'));
 const[category,setCategory]=useState(urlCategory),[query,setQuery]=useState(savedQuery),[target,setTarget]=useState<string|null>(null),[share,setShare]=useState<{id:string;url:string;message:string}|null>(null),list=useRef<HTMLDivElement>(null);
 useEffect(()=>{setQuery(savedQuery);setShare(null);},[savedQuery]);
 useEffect(()=>{setCategory(urlCategory);setShare(null);},[urlCategory]);
 useEffect(()=>{
  const openTarget=()=>{const entry=faqEntry(window.location.hash.slice(1));if(!entry){setTarget(null);return;}const url=new URL(window.location.href),single=(key:string)=>{const values=url.searchParams.getAll(key);return values.length===1?values[0]:undefined;};
   if(!findFaqs(single('faq_q'),single('faq_topic')).some(f=>f.id===entry.id)){
    setQuery('');setCategory(entry.categoryId);window.history.replaceState(window.history.state,'',faqBrowseHref('',entry.categoryId,single('q'),single('type'),entry.id));
   }else{setQuery(cleanSearchQuery(single('faq_q')));setCategory(faqCategory(single('faq_topic')));}
   setTarget(entry.id);
  };
  openTarget();window.addEventListener('hashchange',openTarget);return()=>window.removeEventListener('hashchange',openTarget);
 },[savedQuery,urlCategory]);
 useEffect(()=>{if(!target)return;const element=document.getElementById(target);if(element instanceof HTMLDetailsElement){element.open=true;element.scrollIntoView({block:'start'});element.querySelector('summary')?.focus({preventScroll:true});setTarget(null);}},[target,query,category]);
 const results=findFaqs(query,category),update=(value:string,kind:string)=>{setQuery(value);setCategory(faqCategory(kind));setShare(null);router.push(faqBrowseHref(value,kind,one('q'),one('type')),{scroll:false});};
 const expand=(open:boolean)=>list.current?.querySelectorAll('details').forEach(item=>{item.open=open;});
 const copy=async(id:string)=>{const path=faqQuestionHref(id);if(!path)return;const url=new URL(path,'https://www.hansondm.com').href;try{await navigator.clipboard.writeText(url);setShare({id,url,message:'問題網址已複製，只包含這則公開問答。'});}catch{setShare({id,url,message:'請複製下方的問題網址。'});}};
 return <section className="interior-section faq-explorer" id="faq" aria-labelledby="faq-title"><div className="interior-section-heading"><p className="eyebrow">COMMON QUESTIONS</p><h2 id="faq-title">開始之前，你可能想知道。</h2><p>從需求準備、工具使用到洽詢流程，先了解常見問題；也可用上方內容搜尋查找。</p></div>
  <form role="search" aria-label="常見問題查找" className="site-search-form" onSubmit={e=>{e.preventDefault();update(cleanSearchQuery(query),category);}}><label className="knowledge-search" htmlFor="faq-query">查找常見問題<input disabled={!ready} id="faq-query" type="search" maxLength={120} value={query} placeholder="例如：企業知識、主管培育、合作" onChange={e=>{setQuery(e.target.value);setShare(null);}}/></label><button disabled={!ready} className="button teal-button" type="submit">查找問題 →</button></form>
  <div className="filter-row" role="group" aria-label="常見問題分類">{faqCategories.map(c=><button disabled={!ready} type="button" key={c.id} aria-pressed={category===c.id} onClick={()=>update(cleanSearchQuery(query),c.id)}>{c.label}（{c.id==='all'?faqEntries.length:faqEntries.filter(f=>f.categoryId===c.id).length}）</button>)}</div>
  <div className="faq-tools"><p className="result-count" role="status" aria-live="polite">找到 {results.length} 則常見問題</p><div>{results.length>0&&<><button disabled={!ready} type="button" className="receipt-action" onClick={()=>expand(true)}>展開目前問題</button><button disabled={!ready} type="button" className="receipt-action" onClick={()=>expand(false)}>收合目前問題</button></>}{(query||category!=='all')&&<button disabled={!ready} type="button" className="receipt-action" onClick={()=>update('','all')}>重設問題篩選</button>}</div></div>
  <p className="notice">分類與查找條件可保留在網址，請勿輸入個人或機密資料。複製單題網址只分享該問答，不包含查找文字；不會送出洽詢。</p>
  {results.length===0&&<div className="empty-state"><h3>沒有相符的常見問題</h3><p>可縮短關鍵字或切換分類，也可用上方內容搜尋尋找服務與文章。</p><a className="detail-link" href="#search">前往全站內容搜尋 →</a></div>}
  <div className="faq-list" ref={list}>{results.map(f=><details id={f.id} key={f.id}><summary><span>{f.question}</span><span aria-hidden="true">＋</span></summary><div><p>{f.answer}</p><div className="faq-answer-actions"><Link href={f.href}>查看相關服務 →</Link><button disabled={!ready} className="receipt-action" type="button" onClick={()=>copy(f.id)}>複製這則問題網址<span className="sr-only">：{f.question}</span></button></div>{share?.id===f.id&&<div className="faq-share"><p className="notice" role="status">{share.message}</p><label>問題網址<input disabled={!ready} readOnly value={share.url} onFocus={e=>e.target.select()}/></label></div>}</div></details>)}</div>
 </section>;
}
