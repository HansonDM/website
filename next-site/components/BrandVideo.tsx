'use client';

import {useEffect, useRef, useState, type MouseEvent} from 'react';
import {brandVideo} from '../lib/brand-video';
import LineIcon from './LineIcon';

export default function BrandVideo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const [opened, setOpened] = useState(false);
  const [phase, setPhase] = useState<'loading'|'ready'|'buffering'|'slow'|'failed'>('loading');
  const [attempt, setAttempt] = useState(0);
  const generation = useRef(0), retryFocus = useRef(false);

  useEffect(() => {
    if (!opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [opened]);

  useEffect(() => {
    if (!opened || (phase !== 'loading' && phase !== 'buffering')) return;
    let cancelled = false;
    const current = attempt;
    const timer = window.setTimeout(() => {
      if (!cancelled && dialog.current?.open && generation.current === current) setPhase('slow');
    }, 15000);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [opened, phase, attempt]);

  useEffect(() => {
    if (opened && retryFocus.current) {
      retryFocus.current = false;
      video.current?.focus({preventScroll: true});
    }
  }, [opened, attempt]);

  useEffect(() => () => { generation.current++; }, []);

  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
    event.preventDefault();
    generation.current++;
    setAttempt(generation.current);
    setPhase('loading');
    setOpened(true);
    dialog.current.showModal();
  }

  function closed() {
    generation.current++;
    video.current?.pause();
    setOpened(false);
    retryFocus.current = false;
    trigger.current?.focus({preventScroll: true});
  }

  const current = () => dialog.current?.open && generation.current === attempt;
  function ready() {
    if (current()) setPhase(previous => previous === 'failed' ? previous : 'ready');
  }
  function buffering() {
    if (current() && video.current && !video.current.paused && !video.current.ended)
      setPhase(previous => previous === 'failed' || previous === 'slow' ? previous : 'buffering');
  }
  function retry() {
    video.current?.pause();
    generation.current++;
    setAttempt(generation.current);
    retryFocus.current = true;
    setPhase('loading');
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
      {opened && <video key={attempt} ref={video} tabIndex={0} className="brand-video-player" controls playsInline preload="metadata" poster={brandVideo.poster} src={brandVideo.src} aria-label="韓森管理顧問品牌影片，附繁體中文字幕" onLoadedMetadata={ready} onCanPlay={ready} onPlaying={ready} onWaiting={buffering} onStalled={buffering} onError={() => { if (current()) setPhase('failed'); }}>
        你的瀏覽器無法播放此影片，請使用下方連結直接開啟。
      </video>}
      {opened && phase !== 'ready' && <div className="brand-video-error" role="status" aria-live="polite" aria-busy={phase === 'loading' || phase === 'buffering'}>
        <p>{phase === 'failed' ? '影片暫時無法載入，可以重新載入或使用下方連結直接開啟。' : phase === 'slow' ? '影片載入時間較長，可以重新載入、直接開啟影片，或先閱讀旁白全文。' : phase === 'buffering' ? '影片正在緩衝，請稍候；也可使用下方連結直接開啟。' : '正在載入影片資訊；影片不會自動播放，也可先閱讀旁白全文。'}</p>
        {(phase === 'failed' || phase === 'slow') && <button type="button" className="button" onClick={retry}>重新載入影片</button>}
      </div>}
      <div className="brand-video-links"><a href={brandVideo.src} target="_blank" rel="noopener">直接開啟影片 ↗</a><a href={brandVideo.subtitles} download>下載繁體中文字幕</a></div>
      <details className="brand-video-transcript"><summary>閱讀影片旁白全文</summary>{brandVideo.transcript.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</details>
    </dialog>
  </>;
}
