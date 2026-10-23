'use client';
import DiscussionPrint from './DiscussionPrint';
import {useState,type ReactNode} from 'react';
import {articleOutline,articleShareHref,articleDiscussionBrief,findArticle} from '@/lib/article-reading';

export default function ArticleReader({slug,children}:{slug:string;children:ReactNode}){
 const[large,setLarge]=useState(false),[note,setNote]=useState(''),[shareUrl,setShareUrl]=useState('');
 const article=findArticle(slug)!;
 const download=()=>{const url=URL.createObjectURL(new Blob(['\uFEFF'+articleDiscussionBrief(slug)],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`韓森文章工作討論單-${slug}.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setNote('工作討論單已準備下載，尚未送出任何資料。');};
 return <article className={`detail-article-body article-reader${large?' reading-large':''}`} id="content"><p className="detail-label">{article.label}</p><p className="content-note">本站本階段編寫的主題文章初稿，供預覽與內容審閱；不是 Podcast 轉錄或客戶實績。正式發布前仍需確認文案。</p>
  <div className="article-reading-tools"><div className="article-size-controls" role="group" aria-label="閱讀字級"><span>閱讀字級</span><button type="button" aria-pressed={!large} onClick={()=>setLarge(false)}>標準</button><button type="button" aria-pressed={large} onClick={()=>setLarge(true)}>放大</button></div><div className="article-reading-actions"><button type="button" className="receipt-action" onClick={async()=>{const url=new URL(articleShareHref(slug,window.location.hash),window.location.origin).href;setShareUrl(url);try{await navigator.clipboard.writeText(url);setNote('閱讀網址已複製；從目錄選取章節後，可分享該段落。');}catch{setNote('請複製下方的閱讀網址。');}}}>複製閱讀網址</button><button type="button" className="receipt-action" onClick={download}>下載工作討論單</button><DiscussionPrint content={articleDiscussionBrief(slug)}/></div></div>
  <p className="notice" role="status">{note}</p>{shareUrl&&<label className="comparison-share">閱讀網址<input readOnly value={shareUrl} onFocus={e=>e.target.select()}/></label>}
  <details className="article-outline" open><summary>本文目錄</summary><nav aria-label="文章章節"><ol>{articleOutline(slug).map(s=><li key={s.id}><a href={'#'+s.id}>{s.title}</a></li>)}</ol></nav></details>
  <div className="article-reading-copy">{children}</div><a className="detail-link article-return-top" href="#content">回到本文目錄 ↑</a>
 </article>;
}
