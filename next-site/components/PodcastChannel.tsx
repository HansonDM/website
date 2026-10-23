'use client';
import {useEffect} from 'react';
import {podcast,podcastEpisodes,podcastDate,podcastExcerpt,podcastHashEpisode} from '@/lib/podcast-content';
import PodcastShare from './PodcastShare';
import PodcastPlayer from './PodcastPlayer';

export default function PodcastChannel(){
  const episode=podcast.latest,intro=episode.description.split('\n\n').filter(Boolean);
  useEffect(()=>{const reveal=()=>{const found=podcastHashEpisode(window.location.hash);if(!found)return;const target=document.getElementById('podcast-'+found.id);if(!target)return;if(target instanceof HTMLDetailsElement)target.open=true;else{const detail=target.querySelector('details');if(detail)detail.open=true;}requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));};reveal();window.addEventListener('hashchange',reveal);return()=>window.removeEventListener('hashchange',reveal);},[]);
  return <div className="podcast-channel" data-episode-id={episode.id}>
    <p className="podcast-show-name">{podcast.showTitle}</p>
    <p className="podcast-show-intro">{podcast.showDescription.split('\n\n').slice(1,3).join('\n\n')}</p>
    <article className="podcast-episode" id={'podcast-'+episode.id}>
      <p className="eyebrow">LATEST EPISODE · 最新單集</p>
      <h3><a href={episode.url} target="_blank" rel="noopener noreferrer">{episode.title}</a></h3>
      <p className="podcast-meta"><time dateTime={episode.publishedAt}>{podcastDate(episode.publishedAt)} 上架</time>{episode.durationSeconds&&<> · {Math.floor(episode.durationSeconds/60)} 分 {episode.durationSeconds%60} 秒</>}</p>
      <p>{podcastExcerpt(episode)||'本集介紹請至 Firstory 閱讀。'}</p>
      <details className="podcast-description"><summary>閱讀本集完整介紹</summary><div><p className="notice">以下為 Firstory RSS 提供的單集介紹。</p>{intro.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div></details>
      <div className="podcast-actions"><a className="button teal-button" href={episode.url} target="_blank" rel="noopener noreferrer">到 Firstory 收聽本集 ↗</a><PodcastShare id={episode.id}/></div>
    </article>
    <PodcastPlayer/>
    {podcastEpisodes.length>1&&<section className="podcast-recent" aria-label="近期 Podcast 單集"><h3>接著聽，近期單集</h3><p className="notice">依官方上架日期列出近期 {podcastEpisodes.length} 集；以下介紹為來源原文，更多單集請至 Firstory。</p>{podcastEpisodes.slice(1).map(item=><details className="podcast-recent-item" id={'podcast-'+item.id} key={item.id}><summary><span>{item.title}</span><span className="podcast-meta">{podcastDate(item.publishedAt)}</span></summary><div><p className="notice">Firstory 原始單集介紹</p>{item.description.split('\n\n').filter(Boolean).map((text,i)=><p key={i}>{text}</p>)}<div className="podcast-actions"><a href={item.url} target="_blank" rel="noopener noreferrer" className="detail-link">到 Firstory 收聽本集 ↗</a><PodcastShare id={item.id}/></div></div></details>)}</section>}
    <div className="podcast-source-links"><a href={podcast.showUrl} target="_blank" rel="noopener noreferrer">全部單集 ↗</a><a href={podcast.feedUrl} target="_blank" rel="noopener noreferrer">RSS 訂閱 ↗</a></div>
    <p className="notice podcast-sync-note">每週二晚間自動同步最新已發布單集與介紹；未有新集時保留目前內容。最近同步：{podcastDate(podcast.checkedAt)}。</p>
  </div>;
}
