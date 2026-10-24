'use client';

import {useEffect, useRef, useState, type MouseEvent} from 'react';
import {brandVideo} from '../lib/brand-video';
import LineIcon from './LineIcon';

export default function BrandVideo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [opened]);

  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
    event.preventDefault();
    setFailed(false);
    setOpened(true);
    dialog.current.showModal();
  }

  function closed() {
    video.current?.pause();
    setOpened(false);
    setFailed(false);
    trigger.current?.focus({preventScroll: true});
  }

  function backdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
  }

  return <>
    <a ref={trigger} className="video-button" href={brandVideo.src} target="_blank" rel="noopener" aria-haspopup="dialog" aria-controls="brand-video-dialog" onClick={open}><LineIcon name="play"/>觀看品牌影片</a>
    <dialog ref={dialog} id="brand-video-dialog" className="brand-dialog brand-video-dialog" aria-labelledby="brand-video-title" aria-describedby="brand-video-description" onClose={closed} onClick={backdrop}>
      <button type="button" className="dialog-close" aria-label="關閉品牌影片" autoFocus onClick={() => dialog.current?.close()}>×</button>
      <p className="eyebrow">HANSON CONSULTING</p>
      <h2 id="brand-video-title">{brandVideo.title}</h2>
      <p id="brand-video-description" className="brand-video-description">{brandVideo.durationLabel}。從 AI 與人才發展，探索工作的下一個可能。</p>
      {opened && <video ref={video} className="brand-video-player" controls playsInline preload="metadata" poster={brandVideo.poster} src={brandVideo.src} aria-label="韓森管理顧問品牌影片，附繁體中文字幕" onError={() => { if (dialog.current?.open) setFailed(true); }}>
        你的瀏覽器無法播放此影片，請使用下方連結直接開啟。
      </video>}
      {failed && <div className="brand-video-error" role="status"><p>影片暫時無法載入，可以重新載入或使用下方連結直接開啟。</p><button type="button" className="button" onClick={() => { setFailed(false); video.current?.load(); }}>重新載入影片</button></div>}
      <div className="brand-video-links"><a href={brandVideo.src} target="_blank" rel="noopener">直接開啟影片 ↗</a><a href={brandVideo.subtitles} download>下載繁體中文字幕</a></div>
      <details className="brand-video-transcript"><summary>閱讀影片旁白全文</summary>{brandVideo.transcript.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</details>
    </dialog>
  </>;
}
