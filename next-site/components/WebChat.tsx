'use client';
import {VoiceTextarea} from '@/components/VoiceField';


import {useEffect,useRef,useState,type FormEvent} from 'react';
import {webChat,chatReady,chatReply,chatHistory,chatLink,type ChatTurn} from '@/lib/webchat';

function ReplyText({text}:{text:string}){
 return <>{text.split(/(https?:\/\/[^\s<>]+)/g).map((piece,i)=>{const href=/^https?:\/\//.test(piece)?chatLink(piece):null;return href?<a key={i} href={href} target="_blank" rel="noopener noreferrer">{piece}</a>:piece;})}</>;
}

export default function WebChat(){
 const[ready,setReady]=useState(false),[open,setOpen]=useState(false),[available,setAvailable]=useState(false),[checking,setChecking]=useState(false);
 const[consent,setConsent]=useState(false),[draft,setDraft]=useState(''),[turns,setTurns]=useState<ChatTurn[]>([]),[busy,setBusy]=useState(false),[note,setNote]=useState('');
 const dialog=useRef<HTMLDialogElement>(null),launcher=useRef<HTMLButtonElement>(null),input=useRef<HTMLTextAreaElement>(null),list=useRef<HTMLDivElement>(null);
 const alive=useRef(true),epoch=useRef(0),inFlight=useRef(false),capability=useRef<AbortController|null>(null),request=useRef<AbortController|null>(null),session=useRef('');
 useEffect(()=>{alive.current=true;setReady(true);return()=>{alive.current=false;epoch.current++;capability.current?.abort();request.current?.abort();};},[]);
 useEffect(()=>{if(open&&list.current)list.current.scrollTop=list.current.scrollHeight;},[open,turns,busy]);
 useEffect(()=>{if(!open)return;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=overflow;};},[open]);

 async function check(){
  capability.current?.abort();const controller=new AbortController();capability.current=controller;setChecking(true);setAvailable(false);setNote('正在確認聊天連線（最長約 10 秒）…');
  const timer=setTimeout(()=>controller.abort(),10000);
  try{const r=await fetch(webChat.url,{method:'GET',credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',cache:'no-store',signal:controller.signal});const valid=r.ok&&chatReady(await r.json());if(!alive.current||capability.current!==controller)return;setAvailable(valid);setNote(valid?'': '本分頁目前無法確認聊天服務，請稍後重新確認，或使用聯絡頁。');}
  catch{if(alive.current&&capability.current===controller)setNote('本分頁在 10 秒內未能確認聊天連線或連線失敗；可按「重新確認聊天連線」。未送出任何訊息。');}
  finally{clearTimeout(timer);if(alive.current&&capability.current===controller){setChecking(false);capability.current=null;}}
 }
 function show(){if(!ready||!dialog.current?.showModal)return;setOpen(true);dialog.current.showModal();if(!available&&!checking)void check();}
 function closed(){setOpen(false);launcher.current?.focus({preventScroll:true});}
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const text=draft.trim();if(!ready||!available||!consent||!text||text.length>webChat.maxLength||inFlight.current)return;
  inFlight.current=true;setBusy(true);setNote('正在整理回覆，請稍候。');const generation=epoch.current,id=crypto.randomUUID();session.current||=crypto.randomUUID();
  const history=chatHistory(turns),controller=new AbortController();request.current=controller;const timer=setTimeout(()=>controller.abort(),95000);
  setTurns(previous=>[...previous,{id,question:text,status:'pending'}]);setDraft('');
  try{
   const r=await fetch(webChat.url,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',body:JSON.stringify({action:'sendMessage',sessionId:session.current,requestId:id,chatInput:text,history,noticeVersion:webChat.version,consent:true}),signal:controller.signal});
   const answer=r.ok?chatReply(await r.json(),id):null;if(!answer)throw Error('CHAT_UNAVAILABLE');
   if(!alive.current||generation!==epoch.current)return;setTurns(previous=>previous.map(t=>t.id===id?{...t,answer,status:'received'}:t));setNote('回覆已顯示。');
  }catch{
   if(!alive.current||generation!==epoch.current)return;setTurns(previous=>previous.map(t=>t.id===id?{...t,status:'failed'}:t));setDraft(previous=>previous||text);setNote('目前未取得完整回覆，訊息沒有自動重送。你可以調整問題後再送出，或前往聯絡頁。');
  }finally{clearTimeout(timer);if(alive.current&&generation===epoch.current){inFlight.current=false;setBusy(false);request.current=null;}}
 }
 function fresh(){if(inFlight.current)return;epoch.current++;session.current='';setTurns([]);setDraft('');setNote('已清除本分頁對話，尚未送出新訊息。');input.current?.focus();}

 return <div className="hanson-webchat">
  <button ref={launcher} className="webchat-launcher" type="button" disabled={!ready} onClick={show} title="開啟韓森 AI 顧問" aria-label="韓森 AI 顧問" aria-haspopup="dialog" aria-controls="hanson-webchat-dialog" aria-expanded={open}><span aria-hidden="true">✦</span><span className="webchat-launcher-label">韓森 AI 顧問</span></button>
  <noscript><a className="webchat-noscript" href="/contact/#inquiry">聊天需啟用 JavaScript；可至聯絡頁洽詢。</a></noscript>
  <dialog ref={dialog} id="hanson-webchat-dialog" className="webchat-dialog" aria-labelledby="webchat-title" aria-describedby="webchat-description" onClose={closed} onCancel={()=>{}}>
   <div className="webchat-heading"><div><p className="eyebrow">HANSON · SHARED KNOWLEDGE</p><h2 id="webchat-title">韓森 AI 顧問</h2></div><button type="button" className="webchat-close" aria-label="關閉韓森 AI 顧問" onClick={()=>dialog.current?.close()} autoFocus>×</button></div>
   <p id="webchat-description">與韓森管顧 LINE 共用知識庫設定，從官網公開內容聊聊 AI 應用、職涯領導力與人才發展。</p>
   <div className="webchat-conversation" ref={list} aria-label="本分頁聊天內容" tabIndex={0}>
    <p className="webchat-welcome">你好，我是韓森 AI 顧問。你目前最想釐清哪個工作或組織議題？</p>
    {turns.map(turn=><div className="webchat-turn" key={turn.id}><p className="webchat-user"><strong>你</strong><span>{turn.question}</span></p>{turn.answer&&<p className="webchat-answer"><strong>韓森 AI 顧問</strong><span><ReplyText text={turn.answer}/></span></p>}{turn.status==='failed'&&<p className="webchat-failed">這筆訊息未取得完整回覆。</p>}</div>)}
   </div>
   <p className="webchat-status" role="status" aria-live="polite">{note}</p>
   {!available&&<button className="receipt-action" type="button" disabled={checking||busy} onClick={()=>void check()}>重新確認聊天連線</button>}
   <form onSubmit={submit} className="webchat-form">
    <label className="webchat-consent"><input type="checkbox" checked={consent} disabled={busy} onChange={e=>setConsent(e.target.checked)}/><span>我已閱讀<a href={webChat.noticeUrl} target="_blank" rel="noopener noreferrer">聊天資料說明</a>，同意將訊息及本分頁近期對話送至 n8n、OpenAI 與 Pinecone 處理。</span></label>
    <label htmlFor="webchat-question">想討論的問題（最多2,000字）</label>
    <VoiceTextarea voiceLabel="想討論的問題（最多2,000字）" ref={input} id="webchat-question" value={draft} maxLength={webChat.maxLength} rows={3} disabled={busy} required onChange={e=>setDraft(e.target.value)} placeholder="例如：我們想導入 AI，該先從哪個工作流程開始？"/>
    <p className="webchat-data-note">請勿輸入密碼、員工個資、機密文件或私人管理連結。對話僅留在本分頁記憶體，重新整理會清除；不與 LINE 私人對話合併。</p>
    <div className="webchat-actions"><button type="submit" disabled={!ready||!available||!consent||!draft.trim()||busy}>{busy?'回覆中…':'送出問題 →'}</button><button type="button" disabled={busy||!turns.length} onClick={fresh}>清除本分頁對話</button></div>
   </form>
   <nav className="webchat-links" aria-label="聊天後續服務"><a href="/contact/#online-booking" onClick={()=>dialog.current?.close()}>正式預約</a><a href="/contact/#inquiry" onClick={()=>dialog.current?.close()}>需求洽詢</a><a href="/academy/#public" onClick={()=>dialog.current?.close()}>課程通知</a></nav>
   <p className="webchat-data-note">AI 回覆供討論參考；聊天不代表完成洽詢、預約、報名或訂閱。具體安排由窗口確認。</p>
  </dialog>
 </div>;
}
