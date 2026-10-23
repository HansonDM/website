'use client';
import {useState} from 'react';
import DiscussionPrint from './DiscussionPrint';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import InquiryForm from './InquiryForm';
import {partnershipPlans,partnershipPlan,partnershipForType,partnershipInquiryHref,partnershipBrief} from '@/lib/partnership-planning';
export default function PartnershipInquiry(){
 const query=useSearchParams(),values=query.getAll('model');const plan=partnershipPlan(values.length===1?values[0]:undefined),model=plan?.id??'';
 const[note,setNote]=useState('');
 const download=()=>{const brief=partnershipBrief(model);if(!brief)return;const url=URL.createObjectURL(new Blob(['\uFEFF'+brief],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='韓森合作需求討論單.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setNote('合作討論單已準備下載，未送出提案。');};
 const update=(value:string)=>{const chosen=partnershipPlan(value);setNote('');window.history.replaceState(null,'',partnershipInquiryHref(chosen?.id));};
 return <div className="partnership-inquiry"><div className="partnership-choice" role="group" aria-label="選擇合作方向">{partnershipPlans.map(p=><button type="button" key={p.id} aria-pressed={model===p.id} onClick={()=>update(p.id)}>{p.title}</button>)}</div>
  {plan?<aside className="partnership-summary" aria-label="本次合作方向"><p className="eyebrow">YOUR COLLABORATION DIRECTION</p><h3>{plan.title}</h3><p>{plan.description}</p><h4>可以先整理</h4><ul>{plan.prepare.map(item=><li key={item}>{item}</li>)}</ul><div className="partnership-summary-actions"><button type="button" className="receipt-action" onClick={download}>下載合作討論單</button><DiscussionPrint content={partnershipBrief(model)}/><Link href={`/partnerships/${plan.id}`}>返回這個方向的說明 ↗</Link><button type="button" className="comparison-remove" onClick={()=>update('')}>清除方向選擇</button></div></aside>:<p className="notice">可先選擇合作方向，或在表單中自行選擇合作類型。</p>}
  <p className="notice" role="status">{plan?`目前合作類型：${plan.cooperationType}`:'尚未選擇合作類型。'} 切換方向會保留尚未送出的文字。</p>
  <p className="notice" role="status">{note}</p>
  <InquiryForm initialTopic="策略合作" variant="partnership" initialCooperationType={plan?.cooperationType??''} onCooperationTypeChange={value=>update(partnershipForType(value)?.id??'')}/>
 </div>;
}
