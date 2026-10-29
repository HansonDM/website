'use client';
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {editableVoiceTarget,voiceEdit,writeVoiceValue,voiceError,type VoiceTarget} from '@/lib/voice-input';

type Result={isFinal:boolean;length:number;[key:number]:{transcript:string}};
type Recognizer={lang:string;continuous:boolean;interimResults:boolean;maxAlternatives:number;start:()=>void;stop:()=>void;abort:()=>void;onstart:(()=>void)|null;onend:(()=>void)|null;onerror:((event:{error:string})=>void)|null;onresult:((event:{results:ArrayLike<Result>})=>void)|null};
type RecognitionConstructor=new()=>Recognizer;
type Session={field:VoiceTarget;label:string;button:HTMLButtonElement;value:string;start:number;end:number;url:string;edited:boolean};
const VoiceContext=createContext<{ready:boolean;open:(field:VoiceTarget,label:string,button:HTMLButtonElement)=>void}>({ready:false,open:()=>{}});
export const useVoiceInput=()=>useContext(VoiceContext);
const recognitionConstructor=()=>{const w=window as unknown as {SpeechRecognition?:RecognitionConstructor;webkitSpeechRecognition?:RecognitionConstructor};return w.SpeechRecognition??w.webkitSpeechRecognition;};

export default function VoiceInputProvider({children}:{children:ReactNode}){
 const[ready,setReady]=useState(false),[session,setSession]=useState<Session|null>(null),[supported,setSupported]=useState(false),[listening,setListening]=useState(false),[starting,setStarting]=useState(false),[text,setText]=useState(''),[note,setNote]=useState('');
 const modal=useRef<HTMLDialogElement>(null),source=useRef<Session|null>(null),recognizer=useRef<Recognizer|null>(null),epoch=useRef(0),timer=useRef<ReturnType<typeof setTimeout>|null>(null),watchdog=useRef<ReturnType<typeof setTimeout>|null>(null),path=usePathname(),initialPath=useRef(path),applyFocus=useRef(false);
 function abort(){epoch.current++;const r=recognizer.current;recognizer.current=null;if(timer.current)clearTimeout(timer.current);if(watchdog.current)clearTimeout(watchdog.current);timer.current=null;watchdog.current=null;if(r){r.onstart=r.onend=r.onerror=r.onresult=null;try{r.abort();}catch{}}setListening(false);setStarting(false);}
 function close(){abort();modal.current?.close();}
 function closed(){abort();const old=source.current;source.current=null;setSession(null);setText('');setNote('');if(!applyFocus.current&&old?.button.isConnected)old.button.focus({preventScroll:true});applyFocus.current=false;}
 useEffect(()=>{setReady(true);return()=>{epoch.current++;const r=recognizer.current;if(timer.current)clearTimeout(timer.current);if(watchdog.current)clearTimeout(watchdog.current);if(r){r.onstart=r.onend=r.onerror=r.onresult=null;try{r.abort()}catch{}}};},[]);
 useEffect(()=>{if(path!==initialPath.current){initialPath.current=path;if(source.current)close();}},[path]);
 useEffect(()=>{const cancel=()=>{if(source.current)close()};const hidden=()=>{if(document.hidden)cancel()};window.addEventListener('hashchange',cancel);window.addEventListener('popstate',cancel);window.addEventListener('pagehide',cancel);document.addEventListener('visibilitychange',hidden);return()=>{window.removeEventListener('hashchange',cancel);window.removeEventListener('popstate',cancel);window.removeEventListener('pagehide',cancel);document.removeEventListener('visibilitychange',hidden);};},[]);
 useEffect(()=>{if(!session)return;const saved=document.body.style.overflow;document.body.style.overflow='hidden';const changed=()=>{if(session.field.value!==session.value)session.edited=true;};session.field.addEventListener('input',changed);session.field.addEventListener('change',changed);const observer=new MutationObserver(()=>{if(source.current&&!editableVoiceTarget(source.current.field))close()});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['disabled','readonly','hidden','aria-hidden','open']});return()=>{observer.disconnect();session.field.removeEventListener('input',changed);session.field.removeEventListener('change',changed);document.body.style.overflow=saved;};},[session]);
 function open(field:VoiceTarget,label:string,button:HTMLButtonElement){
  if(!ready||!editableVoiceTarget(field)||source.current)return;
  let start=field.value.length,end=start;try{start=field.selectionStart??start;end=field.selectionEnd??end;}catch{}
  const next={field,label,button,value:field.value,start,end,url:location.href,edited:false};source.current=next;setSession(next);setText('');setNote('');setSupported(!!recognitionConstructor()&&window.isSecureContext);modal.current?.showModal();
 }
 function start(){
  const active=source.current,Constructor=recognitionConstructor();if(!active||!Constructor||!editableVoiceTarget(active.field)||recognizer.current)return;
  let r:Recognizer;try{r=new Constructor()}catch{setNote('目前無法啟動瀏覽器語音服務，可改用鍵盤；原欄位未改動。');return;}const generation=++epoch.current,base=text;recognizer.current=r;setStarting(true);setNote('正在啟動麥克風，請留意瀏覽器的權限提示。');
  const current=()=>generation===epoch.current&&source.current===active&&active.url===location.href&&editableVoiceTarget(active.field);
  const done=()=>{if(timer.current)clearTimeout(timer.current);if(watchdog.current)clearTimeout(watchdog.current);timer.current=null;watchdog.current=null;};
  r.lang='zh-TW';r.continuous=true;r.interimResults=true;r.maxAlternatives=1;
  r.onstart=()=>{if(!current())return;r.onstart=null;if(watchdog.current)clearTimeout(watchdog.current);watchdog.current=null;setStarting(false);setListening(true);setNote('正在聆聽，說完請按「停止辨識」。');timer.current=setTimeout(()=>{if(current()){abort();setNote('已達單次60秒上限，麥克風已停止；可確認文字或再次開始。');}},60000);};
  r.onresult=event=>{if(!current())return;let result='';for(let i=0;i<event.results.length;i++)result+=event.results[i]?.[0]?.transcript??'';setText((base+result).slice(0,6000));};
  r.onerror=event=>{if(!current())return;done();r.onstart=r.onend=r.onerror=r.onresult=null;recognizer.current=null;epoch.current++;try{r.abort()}catch{}setStarting(false);setListening(false);setNote(voiceError(event.error));};
  r.onend=()=>{if(!current())return;done();r.onstart=r.onend=r.onerror=r.onresult=null;recognizer.current=null;epoch.current++;setStarting(false);setListening(false);setNote('麥克風已停止，請核對文字；原欄位尚未改動。');};
  watchdog.current=setTimeout(()=>{if(current()){abort();setNote('10秒內未能啟動麥克風，請檢查權限後再試；原欄位未改動。');}},10000);
  try{r.start()}catch{if(current()){abort();setNote('無法啟動語音辨識，請稍後再試或改用鍵盤；原欄位未改動。');}}
 }
 function stop(){const r=recognizer.current;if(!r)return;setNote('正在結束辨識…');if(watchdog.current)clearTimeout(watchdog.current);watchdog.current=setTimeout(()=>{if(recognizer.current===r){abort();setNote('辨識已停止，請核對目前文字；原欄位尚未改動。');}},2500);try{r.stop()}catch{abort();}}
 function apply(){const active=source.current;if(!active||!editableVoiceTarget(active.field)||active.url!==location.href)return;if(active.edited||active.field.value!==active.value){setNote('原欄位已變更，為保留你的修改，這次不會覆寫。請複製下方辨識文字，或關閉後重新開始。');return;}const edit=voiceEdit(active.value,text,active.start,active.end,active.field.maxLength,active.field instanceof HTMLTextAreaElement);if(!edit.valid){setNote('辨識文字為空白或超過欄位字數上限，請先調整。');return;}abort();applyFocus.current=true;modal.current?.close();writeVoiceValue(active.field,edit.value,edit.caret);}
 const edit=session?voiceEdit(session.value,text,session.start,session.end,session.field.maxLength,session.field instanceof HTMLTextAreaElement):null;
 return <VoiceContext.Provider value={{ready,open}}>{children}<noscript><style>{`.voice-field-tools{display:none}`}</style></noscript><dialog ref={modal} className="voice-dialog" aria-labelledby="voice-title" aria-describedby="voice-description" onClose={closed} onCancel={()=>abort()}>
  <div className="voice-heading"><h2 id="voice-title">語音輸入{session?'：'+session.label:''}</h2><button type="button" className="voice-close" aria-label="關閉語音輸入" onClick={close} autoFocus>×</button></div>
  <p id="voice-description">按下開始後才會使用麥克風。語音可能交由瀏覽器供應商辨識；本站不錄製或保存音檔。<a href="/privacy/#voice-input" target="_blank" rel="noopener noreferrer">語音資料說明 ↗</a></p>
  {session&&!supported&&<p className="notice">此瀏覽器目前未提供網站語音辨識。請改用支援的瀏覽器，或使用手機／電腦鍵盤的麥克風輸入；原欄位仍可手動填寫。</p>}
  <div className="voice-actions"><button type="button" onClick={start} disabled={!session||!supported||listening||starting}>開始語音輸入</button><button type="button" onClick={stop} disabled={!listening&&!starting}>停止辨識</button></div>
  <p className="voice-note" role="status" aria-live="polite">{note}</p>
  <label className="voice-preview-label" htmlFor="voice-preview">辨識文字（可先修改）</label><textarea id="voice-preview" rows={5} maxLength={6000} value={text} disabled={listening||starting} onChange={e=>setText(e.target.value)} placeholder="辨識結果會顯示在這裡，確認前不會填入原欄位。"/>
  <p className="voice-limit">{session?.field.maxLength&&session.field.maxLength>0?`原欄位上限 ${session.field.maxLength} 字；填入後共 ${edit?.value.length??0} 字。`:''} 信箱、電話與專有名詞請再核對；保留原本輸入，只替換開始前選取的文字。</p>
  <div className="voice-actions"><button type="button" className="voice-apply" disabled={!session||listening||starting||!edit?.valid} onClick={apply}>確認填入欄位</button><button type="button" onClick={close}>取消，不填入</button></div>
  <p className="voice-limit">確認會填入指定欄位，不會送出洽詢、預約、訂閱或聊天；即時篩選維持原欄位行為。關閉視窗、切換頁面或離開分頁會停止辨識。</p>
 </dialog></VoiceContext.Provider>;
}
