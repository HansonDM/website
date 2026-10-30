'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';

/** Uses only the supplied discussion outline, never the adjacent inquiry form. */
export default function DiscussionPrint({content,disabled=false}:{content:string;disabled?:boolean}){
 const[mounted,setMounted]=useState(false),[snapshot,setSnapshot]=useState(''),id=useId(),dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
 const session=useRef<{content:string;url:string}|null>(null),alive=useRef(false),latest=useRef({content,disabled});
 latest.current={content,disabled};
 useEffect(()=>{
  alive.current=true;setMounted(true);
  const invalidate=()=>{session.current=null;dialog.current?.close();setSnapshot('');};
  window.addEventListener('hashchange',invalidate);window.addEventListener('popstate',invalidate);
  return()=>{alive.current=false;session.current=null;window.removeEventListener('hashchange',invalidate);window.removeEventListener('popstate',invalidate);};
 },[]);
 useEffect(()=>{if(session.current&&(disabled||session.current.content!==content)){session.current=null;dialog.current?.close();setSnapshot('');}},[content,disabled]);
 function open(){
  if(!mounted||disabled||!dialog.current?.showModal||dialog.current.open)return;
  session.current={content,url:window.location.href};setSnapshot(content);dialog.current.showModal();
 }
 function closed(){
  if(dialog.current?.open)return;
  const previous=session.current;session.current=null;if(!alive.current)return;setSnapshot('');
  if(previous?.url===window.location.href&&trigger.current?.isConnected&&!trigger.current.disabled)trigger.current.focus({preventScroll:true});
 }
 function print(){
  const current=session.current;
  if(!current||!dialog.current?.open||latest.current.disabled||current.url!==window.location.href||current.content!==latest.current.content){session.current=null;dialog.current?.close();setSnapshot('');return;}
  window.print();
 }
 return <><button ref={trigger} disabled={!mounted||disabled} type="button" className="receipt-action" aria-haspopup="dialog" aria-controls={id+'-dialog'} onClick={open}>列印／另存 PDF</button>{mounted&&createPortal(<dialog className="discussion-dialog" id={id+'-dialog'} ref={dialog} aria-labelledby={id} aria-describedby={id+'-note'} onClose={closed}>
  <div className="discussion-toolbar"><h2 id={id}>討論單預覽</h2><button type="button" className="receipt-action" autoFocus onClick={()=>dialog.current?.close()}>關閉預覽</button></div>
  <p className="notice discussion-print-help" id={id+'-note'}>由你的裝置整理，不會送出資料。可在瀏覽器列印視窗選擇紙張或「另存為 PDF」；取消列印不影響本頁選擇。</p>
  <div className="discussion-document"><pre>{snapshot}</pre></div>
  <div className="discussion-print-actions"><button type="button" className="button gold-button" onClick={print}>開啟列印視窗</button><button type="button" className="receipt-action" onClick={()=>dialog.current?.close()}>返回繼續整理</button></div>
 </dialog>,document.body)}</>;
}
