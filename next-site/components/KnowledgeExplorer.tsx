'use client';
import {useEffect} from 'react';
import Link from 'next/link';
import {faqs} from '@/lib/interior-content';
export default function KnowledgeExplorer(){
 useEffect(()=>{const openTarget=()=>{const id=window.location.hash.slice(1);if(!/^faq-\d+$/.test(id))return;const item=document.getElementById(id);if(item instanceof HTMLDetailsElement){item.open=true;item.scrollIntoView({block:'start'});}};openTarget();window.addEventListener('hashchange',openTarget);return()=>window.removeEventListener('hashchange',openTarget);},[]);
 return <section className="interior-section" id="faq"><div className="interior-section-heading"><p className="eyebrow">COMMON QUESTIONS</p><h2>開始之前，你可能想知道。</h2><p>從需求準備、工具使用到洽詢流程，先了解常見問題；也可用上方內容搜尋查找。</p></div><div className="faq-list">{faqs.map((f,i)=><details id={`faq-${i+1}`} key={f.question}><summary><span>{f.question}</span><span aria-hidden="true">＋</span></summary><div><p>{f.answer}</p><Link href={f.href}>查看相關服務 →</Link></div></details>)}</div></section>;
}
