'use client';
import {useRef} from 'react';
import LineIcon from './LineIcon';
export default function BrandVideo(){const dialog=useRef<HTMLDialogElement>(null);return <><button className="video-button" onClick={()=>dialog.current?.showModal()}><LineIcon name="play"/>觀看品牌影片</button><dialog ref={dialog} className="brand-dialog"><button className="dialog-close" aria-label="關閉影片資訊" onClick={()=>dialog.current?.close()}>×</button><p className="eyebrow">HANSON CONSULTING</p><h2>品牌影片準備中</h2><p>正式影片確認後將於此提供觀看。</p><button className="button" onClick={()=>dialog.current?.close()}>返回首頁</button></dialog></>}
