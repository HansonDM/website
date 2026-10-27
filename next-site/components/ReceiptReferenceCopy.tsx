'use client';

import {useEffect,useId,useRef,useState} from 'react';

export default function ReceiptReferenceCopy({reference,title,announce=true}:{reference:string;title:string;announce?:boolean}) {
 const [ready,setReady]=useState(false),[note,setNote]=useState(''),[manual,setManual]=useState(false);
 const id=useId(),alive=useRef(false),epoch=useRef(0),currentReference=useRef(reference);
 currentReference.current=reference;
 useEffect(()=>{
  alive.current=true;setReady(true);
  const reset=()=>{epoch.current++;setNote('');setManual(false);};reset();
  window.addEventListener('hashchange',reset);window.addEventListener('popstate',reset);
  return()=>{alive.current=false;epoch.current++;window.removeEventListener('hashchange',reset);window.removeEventListener('popstate',reset);};
 },[reference]);
 async function copy(){
  const generation=++epoch.current,source=window.location.href;
  const valid=()=>alive.current&&generation===epoch.current&&reference===currentReference.current&&source===window.location.href;
  setNote('');setManual(false);
  try{await navigator.clipboard.writeText(reference);if(valid())setNote('編號已複製。');}
  catch{if(valid()){setManual(true);setNote('瀏覽器未允許直接複製，請選取下方編號手動複製。');}}
 }
 return <div>
  <button type="button" className="receipt-action" disabled={!ready} onClick={()=>void copy()}>複製{title}</button>
  {note&&<p className="notice" role={announce?'status':undefined} aria-live={announce?'polite':undefined}>{note}</p>}
  {manual&&<div className="faq-share"><label htmlFor={id}>手動複製{title}<input id={id} type="text" readOnly value={reference} autoComplete="off" spellCheck={false} onFocus={e=>e.currentTarget.select()}/></label></div>}
 </div>;
}
