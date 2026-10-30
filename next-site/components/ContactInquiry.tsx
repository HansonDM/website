'use client';
import {Suspense,useCallback,useEffect,useMemo,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {resolveInquiryContext,resolveInquiryQuery} from '@/lib/inquiry-context';
import {publicContact} from '@/lib/public-contact';
import type {InquirySource} from '@/lib/inquiry-links';
import InquiryContext from './InquiryContext';
import InquiryForm from './InquiryForm';
type Context=ReturnType<typeof resolveInquiryContext>;
type Initial={topic?:string;interest?:string;from?:InquirySource;comparison?:string;planning?:string;focus?:string};
// The observer can suspend without removing public contact information from HTML.
function ContactQueryBridge({onChange}:{onChange:(context:Context)=>void}){
 const params=useSearchParams(),query=params.toString();
 const context=useMemo(()=>resolveInquiryQuery(new URLSearchParams(query)),[query]);
 useEffect(()=>onChange(context),[context,onChange]);return null;
}
export default function ContactInquiry({topic,interest,from,comparison,planning,focus}:Initial){
 const[context,setContext]=useState(()=>resolveInquiryContext(topic,interest,from,comparison,planning,focus)),[ready,setReady]=useState(false);
 const restore=useCallback((next:Context)=>{setContext(next);setReady(true);},[]);
 return <><noscript><style>{`.interior-contact .inquiry-fields,.interior-contact .inquiry>button{display:none}`}</style><p className="notice contact-reading-notice">目前可直接閱讀服務主題與後續流程；來源方向與返回連結需網站腳本還原。線上洽詢需啟用 JavaScript，或透過表單提供的聯絡信箱洽詢。<Link href="/privacy/"> 閱讀資料使用告知 →</Link></p></noscript>
 <section id="inquiry" className={`interior-section contact-layout${context.topic||context.interest?' with-inquiry-context':''}`}><aside className="contact-aside"><p className="eyebrow">TELL US YOUR CHALLENGE</p><h2>先理解你的需求，<br/>再一起規劃下一步。</h2><p>無論是 AI 導入、人才發展、企業內訓，或一個合作構想，都可以從具體問題開始。</p><p>聯絡窗口：{publicContact.name}（個人電話作為業務聯絡使用）</p><div className="receipt-actions"><a className="receipt-action" href={publicContact.phoneHref}>聯絡電話 {publicContact.phone}</a></div><p>{publicContact.addressLabel}：<br/>{publicContact.address}</p><div className="contact-topics">{[['AI 數位轉型','流程、資料與 AI 應用'],['人才資產發展','人才盤點、主管與團隊培育'],['企業內訓','對象、目標與學習情境'],['公開班','課程主題需求與開課關注'],['策略合作','專業領域與合作提案']].map(([t,d])=><div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div><Link href="/community" className="text-link">查看社群中心 →</Link></aside><div className="contact-form-panel"><InquiryContext topic={context.topic} interest={context.interest} from={context.from} comparison={context.comparison.join(',')} planning={context.planning} focus={context.focus.join(',')}/><InquiryForm key={`${context.topic}-${context.interest}`} initialTopic={context.topic} initialInterest={context.interest} contextReady={ready}/></div></section>
 <Suspense fallback={null}><ContactQueryBridge onChange={restore}/></Suspense></>;
}
