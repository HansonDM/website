'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import DiscussionPrint from './DiscussionPrint';
import Link from 'next/link';
import InquiryForm from './InquiryForm';
import {partnershipPlans,partnershipPlan,partnershipForType,partnershipInquiryHref,partnershipModelFromSearch,partnershipBrief} from '@/lib/partnership-planning';
export default function PartnershipInquiry(){
 const[model,setModel]=useState(''),[initialized,setInitialized]=useState(false),plan=partnershipPlan(model);
 const[note,setNote]=useState(''),[shareUrl,setShareUrl]=useState(''),shareEpoch=useRef(0);
 const resetFeedback=useCallback(()=>{shareEpoch.current++;setNote('');setShareUrl('');},[]);
 const restore=useCallback(()=>{setModel(partnershipModelFromSearch(window.location.search));resetFeedback();setInitialized(true);},[resetFeedback]);
 useEffect(()=>{restore();window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);return()=>{shareEpoch.current++;window.removeEventListener('popstate',restore);window.removeEventListener('hashchange',restore);};},[restore]);
 const download=()=>{const brief=partnershipBrief(model);if(!brief)return;const url=URL.createObjectURL(new Blob(['\uFEFF'+brief],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='韓森合作需求討論單.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setNote('合作討論單已準備下載，未送出提案。');};
 const update=(value:string)=>{const chosen=partnershipPlan(value),href=partnershipInquiryHref(chosen?.id);if(window.location.pathname+window.location.search+window.location.hash!==href)window.history.pushState(null,'',href);setModel(chosen?.id??'');resetFeedback();};
 const copy=async()=>{if(!plan)return;const epoch=++shareEpoch.current,url=new URL(partnershipInquiryHref(plan.id),window.location.origin).href;setShareUrl(url);try{await navigator.clipboard.writeText(url);if(epoch===shareEpoch.current)setNote('合作方向網址已複製，不包含表單文字。');}catch{if(epoch===shareEpoch.current)setNote('請複製下方的合作方向網址，不包含表單文字。');}};
 return <div className="partnership-inquiry"><noscript><style>{`.partnership-inquiry .partnership-choice,.partnership-inquiry .inquiry-fields,.partnership-inquiry .inquiry>button{display:none}`}</style><p className="notice public-reading-notice">合作模式、流程與問答可直接閱讀；方向選擇與提案整理需啟用網站腳本。線上提案收件尚未啟用。</p></noscript><div className="partnership-choice" role="group" aria-label="選擇合作方向">{partnershipPlans.map(p=><button disabled={!initialized} type="button" key={p.id} aria-pressed={model===p.id} onClick={()=>update(p.id)}>{p.title}</button>)}</div>
  {plan?<aside className="partnership-summary" aria-label="本次合作方向"><p className="eyebrow">YOUR COLLABORATION DIRECTION</p><h3>{plan.title}</h3><p>{plan.description}</p><h4>可以先整理</h4><ul>{plan.prepare.map(item=><li key={item}>{item}</li>)}</ul><div className="partnership-summary-actions"><button disabled={!initialized} type="button" className="receipt-action" onClick={download}>下載合作討論單</button><DiscussionPrint disabled={!initialized} content={partnershipBrief(model)}/><button disabled={!initialized} type="button" className="receipt-action" onClick={copy}>複製合作方向網址</button><Link href={`/partnerships/${plan.id}`}>返回這個方向的說明 ↗</Link><button disabled={!initialized} type="button" className="comparison-remove" onClick={()=>update('')}>清除方向選擇</button></div>{shareUrl&&<label className="comparison-share">合作方向網址<input readOnly value={shareUrl} onFocus={e=>e.target.select()}/></label>}<p className="notice">方向分享只包含公開合作代號，不包含姓名、聯絡資訊或提案摘要，也不代表已送出提案。</p></aside>:<p className="notice">可先選擇合作方向，或在表單中自行選擇合作類型。</p>}
  <p className="notice" role="status">{plan?`目前合作類型：${plan.cooperationType}`:'尚未選擇合作類型。'} 切換方向會保留尚未送出的文字。</p>
  <p className="notice" role="status">{note}</p>
  <InquiryForm contextReady={initialized} initialTopic="策略合作" variant="partnership" initialCooperationType={plan?.cooperationType??''} onCooperationTypeChange={value=>update(partnershipForType(value)?.id??'')}/>
 </div>;
}
