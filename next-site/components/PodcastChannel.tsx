'use client';
import {useState} from 'react';
import podcast from '@/lib/podcast-feed.json';

export default function PodcastChannel(){
  const [player,setPlayer]=useState(false);
  const episode=podcast.latest;
  const date=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(episode.publishedAt));
  const checked=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(podcast.checkedAt));
  const intro=episode.description.split('\n\n').filter(Boolean);
  const excerpt=(intro[0]||'本集介紹請至 Firstory 閱讀。').slice(0,220);
  return <div className="podcast-channel" data-episode-id={episode.id}>
    <p className="podcast-show-name">{podcast.showTitle}</p>
    <p className="podcast-show-intro">{podcast.showDescription.split('\n\n').slice(1,3).join('\n\n')}</p>
    <article className="podcast-episode">
      <p className="eyebrow">LATEST EPISODE · 最新單集</p>
      <h3><a href={episode.url} target="_blank" rel="noopener noreferrer">{episode.title}</a></h3>
      <p className="podcast-meta"><time dateTime={episode.publishedAt}>{date} 上架</time>{episode.durationSeconds&&<> · {Math.floor(episode.durationSeconds/60)} 分 {episode.durationSeconds%60} 秒</>}</p>
      <p>{excerpt}{(intro[0]?.length||0)>220?'…':''}</p>
      <details className="podcast-description"><summary>閱讀本集完整介紹</summary><div><p className="notice">以下為 Firstory RSS 提供的單集介紹。</p>{intro.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div></details>
      <div className="podcast-actions"><a className="button teal-button" href={episode.url} target="_blank" rel="noopener noreferrer">到 Firstory 收聽本集 ↗</a></div>
    </article>
    <div className="podcast-player">
      {player?<><iframe src={podcast.embedUrl} title="企業解憂事務所 Firstory 節目播放器" height="450" loading="lazy" allow="encrypted-media" referrerPolicy="strict-origin-when-cross-origin"/><button type="button" className="text-link" onClick={()=>setPlayer(false)}>關閉播放器</button></>:<button type="button" className="button gold-button podcast-load-player" onClick={()=>setPlayer(true)}>載入 Firstory 播放器 ▷</button>}
      <noscript><style>{`.podcast-load-player{display:none}`}</style></noscript>
    </div>
    <div className="podcast-source-links"><a href={podcast.showUrl} target="_blank" rel="noopener noreferrer">全部單集 ↗</a><a href={podcast.feedUrl} target="_blank" rel="noopener noreferrer">RSS 訂閱 ↗</a></div>
    <p className="notice podcast-sync-note">每週二晚間自動同步最新已發布單集與介紹；未有新集時保留目前內容。最近同步：{checked}。</p>
  </div>;
}
