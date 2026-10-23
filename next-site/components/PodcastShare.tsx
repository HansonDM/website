'use client';
import {useState} from 'react';
import {podcastShareUrl} from '@/lib/podcast-content';
export default function PodcastShare({id}:{id:string}){
 const[note,setNote]=useState(''),[manual,setManual]=useState('');
 const copy=async()=>{const url=podcastShareUrl(id);if(!url)return;try{await navigator.clipboard.writeText(url);setManual('');setNote('原始單集連結已複製。');}catch{setManual(url);setNote('請選取下方網址並手動複製。');}};
 return <div className="podcast-share"><button className="receipt-action" type="button" onClick={copy}>複製本集連結</button><p role="status" aria-live="polite">{note}</p>{manual&&<label htmlFor={'podcast-share-'+id}>原始單集網址<input id={'podcast-share-'+id} readOnly value={manual} onFocus={e=>e.currentTarget.select()}/></label>}</div>;
}
