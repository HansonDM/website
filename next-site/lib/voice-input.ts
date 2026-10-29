/** Speech only edits explicitly confirmed text. Nothing here submits or persists a form. */
export type VoiceTarget=HTMLInputElement|HTMLTextAreaElement;
export function editableVoiceTarget(field:VoiceTarget|null):field is VoiceTarget{
 return !!field&&field.isConnected&&!field.readOnly&&!field.matches(':disabled')&&!field.closest('[hidden],[aria-hidden="true"],.form-trap,.participation-trap')&&(field instanceof HTMLTextAreaElement||['text','search','email','tel','url'].includes(field.type))&&field.getClientRects().length>0;
}
export function voiceEdit(value:string,spoken:string,start:number,end:number,maxLength:number,multiline:boolean){
 const text=multiline?spoken.replace(/\r\n?/g,'\n'):spoken.replace(/[\r\n]+/g,' ');
 const from=Math.max(0,Math.min(value.length,Number.isFinite(start)?start:value.length)),to=Math.max(from,Math.min(value.length,Number.isFinite(end)?end:from));
 const next=value.slice(0,from)+text+value.slice(to);
 return{value:next,caret:from+text.length,valid:text.trim().length>0&&(maxLength<0||next.length<=maxLength)};
}
export function writeVoiceValue(field:VoiceTarget,value:string,caret:number){
 const prototype=field instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
 Object.getOwnPropertyDescriptor(prototype,'value')!.set!.call(field,value);
 field.dispatchEvent(new Event('input',{bubbles:true,composed:true}));field.focus({preventScroll:true});
 try{field.setSelectionRange(caret,caret);}catch{/* Email/number-like controls do not expose a selection API. */}
}
export function voiceError(code:string){return({
 'not-allowed':'麥克風權限未開放。請在瀏覽器網站設定允許麥克風，或改用鍵盤輸入。',
 'service-not-allowed':'這個瀏覽器未開放語音辨識服務。請改用支援的瀏覽器或裝置鍵盤的麥克風。',
 'audio-capture':'找不到可用的麥克風，請確認裝置或改用鍵盤輸入。',
 'no-speech':'尚未辨識到說話聲，可再試一次；原欄位未改動。',
 network:'語音辨識連線失敗，沒有自動重試；可重新開始或改用鍵盤輸入。',
 'language-not-supported':'目前的辨識服務未支援繁體中文，可改用裝置鍵盤的語音輸入。'
} as Record<string,string>)[code]??'目前無法完成語音辨識，可重新開始或使用鍵盤；原欄位未改動。';}
