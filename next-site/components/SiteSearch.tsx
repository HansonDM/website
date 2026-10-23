'use client';
import Link from 'next/link';
import {navigateKnowledgeFilters} from '@/lib/knowledge-navigation';
import {useEffect,useState} from 'react';
import {useKnowledgeQuery,useKnowledgeReady} from './KnowledgeQueryProvider';
import {cleanSearchQuery,searchKind,searchKinds,searchSite,type SearchKind} from '@/lib/site-search';
import type {CasePreviewEntry} from '@/lib/case-preview-model';
export default function SiteSearch({entries=[]}:{entries?:CasePreviewEntry[]}){
 const ready=useKnowledgeReady(),params=useKnowledgeQuery(),one=(key:string)=>{const values=params.getAll(key);return values.length===1?values[0]:undefined;},initialQuery=cleanSearchQuery(one('q')),initialKind=searchKind(one('type'));const[query,setQuery]=useState(initialQuery),[kind,setKind]=useState<SearchKind>(initialKind),[limit,setLimit]=useState(8);
 useEffect(()=>{setQuery(initialQuery);setKind(searchKind(initialKind));setLimit(8);},[initialQuery,initialKind]);
 const active=!!cleanSearchQuery(query)||kind!=='all',results=active?searchSite(query,kind,entries):[];
 const update=(q:string,k:SearchKind)=>{setQuery(q);setKind(k);setLimit(8);navigateKnowledgeFilters('search',q,k);};
 return <section className="interior-section site-search" id="search" aria-labelledby="site-search-title"><div className="interior-section-heading"><p className="eyebrow">FIND YOUR NEXT STEP</p><h2 id="site-search-title">從一個問題，找到相關內容。</h2><p>搜尋本站服務、顧問團隊、內訓規劃、{entries.length>0?'匿名公司專案與顧問歷任題材、':''}Podcast 單集、文章初稿與常見問題。這是網站內容的關鍵字搜尋。</p></div>
 <form role="search" aria-label="網站內容搜尋" className="site-search-form" onSubmit={e=>{e.preventDefault();update(cleanSearchQuery(query),kind);}}><label className="knowledge-search" htmlFor="site-search-query">想了解什麼？<input disabled={!ready} id="site-search-query" type="search" name="q" maxLength={120} value={query} onChange={e=>{setQuery(e.target.value);setLimit(8);}} placeholder="例如：流程自動化、職涯領導力、二代接班"/></label><button disabled={!ready} className="button teal-button" type="submit">搜尋內容 →</button></form>
 <div className="filter-row" aria-label="搜尋內容類型">{searchKinds.map(k=><button disabled={!ready} type="button" key={k.value} aria-pressed={kind===k.value} onClick={()=>update(cleanSearchQuery(query),k.value)}>{k.label}</button>)}</div>
 <p className="result-count" role="status" aria-live="polite">{active?`找到 ${results.length} 筆相關內容${results.length>limit?`，目前顯示 ${limit} 筆`:''}`:'輸入關鍵字，或選擇一種內容類型開始查找。'}</p>
 {!active&&<div className="search-suggestions"><span>你也可以從這裡開始</span>{['流程自動化','職涯領導力','二代接班','內訓需求'].map(q=><button disabled={!ready} type="button" key={q} onClick={()=>update(q,'all')}>{q} ↗</button>)}</div>}
 {active&&results.length>0&&<ol className="search-results">{results.slice(0,limit).map(r=><li key={r.id}><p className="category-label">{r.label} · {r.topic}</p><h3>{['faq','company-case','consultant-experience','podcast'].includes(r.kind)?<a href={r.href}>{r.title}</a>:<Link href={r.href}>{r.title}</Link>}</h3><p>{r.summary}</p>{r.kind==='podcast'?<a className="detail-link" href={r.href}>閱讀單集介紹與收聽 →</a>:r.kind==='faq'?<a className="detail-link" href={r.href}>閱讀完整問答 →</a>:['company-case','consultant-experience'].includes(r.kind)?<a className="detail-link" href={r.href}>查看題材與工作角色 →</a>:<Link className="detail-link" href={r.href}>查看內容 →</Link>}</li>)}</ol>}
 {active&&results.length===0&&<div className="empty-state"><h3>目前沒有相符的內容</h3><p>可縮短關鍵字或切換內容類型，也可以先了解兩項核心服務。</p><div className="search-empty-links"><Link href="/ai-transformation">AI 數位轉型 →</Link><Link href="/talent-development">人才資產發展 →</Link></div></div>}
 <div className="search-result-actions">{results.length>limit&&<button disabled={!ready} className="receipt-action" type="button" onClick={()=>setLimit(v=>v+8)}>顯示更多內容</button>}{active&&<button disabled={!ready} className="receipt-action" type="button" onClick={()=>update('','all')}>重設搜尋</button>}</div>
 <p className="notice">{entries.length>0?'公司專案與顧問歷任經驗分開標示，匿名題材不等於已驗證的客戶成果。':''}文章與課程規劃保留初稿標示；搜尋關鍵字不送往外部 AI 服務。按下搜尋或選擇分類後，網址會保留查詢條件，分享前請勿放入個人或機密資料。</p>
 </section>;
}
