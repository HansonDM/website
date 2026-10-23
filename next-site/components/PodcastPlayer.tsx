'use client';
import {useEffect,useRef,useState} from 'react';
import {podcast} from '@/lib/podcast-content';

type Phase='closed'|'loading'|'settled'|'slow'|'failed';
export default function PodcastPlayer(){
 const[ready,setReady]=useState(false),[phase,setPhase]=useState<Phase>('closed'),[attempt,setAttempt]=useState(0);
 const generation=useRef(0),returnFocus=useRef(false),loadButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{if(phase==='closed'&&returnFocus.current){returnFocus.current=false;loadButton.current?.focus();}},[phase]);
 useEffect(()=>{if(phase!=='loading')return;const timer=window.setTimeout(()=>{if(generation.current===attempt)setPhase('slow');},15000);return()=>window.clearTimeout(timer);},[phase,attempt]);
 const open=()=>{generation.current+=1;setAttempt(generation.current);setPhase('loading');};
 const close=()=>{generation.current+=1;returnFocus.current=true;setPhase('closed');};
 const status=phase==='loading'?'正在載入 Firstory 播放器…':phase==='slow'?'載入時間較長，你可以重新載入播放器，或直接到 Firstory 收聽。':phase==='failed'?'目前無法開啟播放器，請重新載入或使用 Firstory 收聽連結。':'若播放器空白或無法播放，可重新載入或直接到 Firstory 收聽。';
 return <div className="podcast-player" data-player-state={phase}>
  {phase==='closed'?<><button ref={loadButton} disabled={!ready} type="button" className="button gold-button podcast-load-player" onClick={open}>載入 Firstory 播放器 ▷</button>{!ready&&<p className="notice podcast-player-tools-note">節目介紹與收聽連結可直接閱讀；播放器與分享工具需啟用網站腳本。</p>}</>:<>
   <p className="notice podcast-player-status" role="status" aria-live="polite">{status}</p>
   <iframe key={attempt} src={podcast.embedUrl} title="企業解憂事務所 Firstory 節目播放器" height="450" allow="encrypted-media" referrerPolicy="strict-origin-when-cross-origin" aria-busy={phase==='loading'} onLoad={()=>{if(generation.current===attempt)setPhase('settled');}} onError={()=>{if(generation.current===attempt)setPhase('failed');}}/>
   <div className="podcast-actions"><button type="button" className="receipt-action podcast-load-player" onClick={open}>重新載入播放器</button><a className="detail-link" href={podcast.showUrl} target="_blank" rel="noopener noreferrer">直接到 Firstory 收聽 ↗</a><button type="button" className="text-link" onClick={close}>關閉播放器</button></div>
  </>}
  <noscript><style>{`.podcast-load-player,.podcast-share,.podcast-player-tools-note{display:none}`}</style><p className="notice podcast-nojs-notice">節目介紹可直接閱讀，請使用 Firstory 原始收聽連結開啟節目。</p></noscript>
 </div>;
}
