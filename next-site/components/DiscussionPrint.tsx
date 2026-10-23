'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';

/** Uses only the supplied discussion outline, never the adjacent inquiry form. */
export default function DiscussionPrint({content}:{content:string}){
 const[mounted,setMounted]=useState(false),id=useId(),dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>setMounted(true),[]);
 return <><button type="button" className="receipt-action" aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}>列印／另存 PDF</button>{mounted&&createPortal(<dialog className="discussion-dialog" ref={dialog} aria-labelledby={id} aria-describedby={id+'-note'}>
  <div className="discussion-toolbar"><h2 id={id}>討論單預覽</h2><button type="button" className="receipt-action" onClick={()=>dialog.current?.close()}>關閉預覽</button></div>
  <p className="notice discussion-print-help" id={id+'-note'}>由你的裝置整理，不會送出資料。可在瀏覽器列印視窗選擇紙張或「另存為 PDF」；取消列印不影響本頁選擇。</p>
  <div className="discussion-document"><pre>{content}</pre></div>
  <div className="discussion-print-actions"><button type="button" className="button gold-button" onClick={()=>window.print()}>開啟列印視窗</button><button type="button" className="receipt-action" onClick={()=>dialog.current?.close()}>返回繼續整理</button></div>
 </dialog>,document.body)}</>;
}
