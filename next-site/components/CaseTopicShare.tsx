'use client';
import {useState} from 'react';
export default function CaseTopicShare({id,href}:{id:string;href:string}){
 const [note,setNote]=useState(''),[manual,setManual]=useState('');
 const copy=async()=>{const url=new URL(href,window.location.origin).href;try{await navigator.clipboard.writeText(url);setManual('');setNote('題材連結已複製；連結只包含公開題材代號。');}catch{setManual(url);setNote('請選取下方網址並手動複製。');}};
 return <div className="case-topic-share"><button type="button" className="receipt-action" onClick={copy}>複製此題材連結</button><p role="status" aria-live="polite">{note}</p>{manual&&<label htmlFor={'share-'+id}>公開題材網址<input id={'share-'+id} value={manual} readOnly onFocus={e=>e.currentTarget.select()}/></label>}</div>;
}
