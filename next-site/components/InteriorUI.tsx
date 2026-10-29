import Link from 'next/link';
import {inquiryHref} from '@/lib/inquiry-links';
import LineIcon,{type IconName} from './LineIcon';
import type {ServiceItem} from '@/lib/interior-content';
import {editorialPhotos} from '@/lib/editorial-photos';
export function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}){return <div className="interior-section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description&&<p>{description}</p>}</div>}
export function SectionLinks({links}:{links:[string,string][]}){return <nav className="section-links" aria-label="本頁內容">{links.map(([id,title])=><a href={`#${id}`} key={id}>{title}<span>↓</span></a>)}</nav>}
export function ServiceSections({items,parent}:{items:ServiceItem[];parent?:string}){return <div className="service-sections">{items.map((s,i)=><article className="offering" id={s.id} key={s.id}><span className="offering-number">0{i+1}</span><div><h2>{s.title}</h2><p>{s.description}</p>{parent&&<Link className="detail-link" href={`/${parent}/${s.id}`}>閱讀完整服務說明 →</Link>}</div><ul>{s.points.map(p=><li key={p}>{p}</li>)}</ul></article>)}</div>}
export function Process({items}:{items:[string,string][]}){return <ol className="interior-process">{items.map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>}
export function Cta({title='從你的需求開始，一起找到下一步。',text='先聊聊企業現況與期待，再共同規劃合適的服務。',topic,label='預約需求交流'}:{title?:string;text?:string;topic?:string;label?:string}){return <section className="interior-cta"><div><p className="eyebrow">LET’S MOVE FORWARD</p><h2>{title}</h2><p>{text}</p></div><Link href={topic?inquiryHref(topic):'/contact/'} className="button gold-button">{label}<span>→</span></Link></section>}
export function EmptyState({title,text,icon='document'}:{title:string;text:string;icon?:IconName}){return <div className="empty-state"><span><LineIcon name={icon}/></span><h3>{title}</h3><p>{text}</p></div>}
export function EditorialPhoto({kind='talent'}:{kind?:keyof typeof editorialPhotos}){const photo=editorialPhotos[kind];return <figure className={`editorial-photo editorial-topic-photo photo-${kind}`}><img {...photo} loading="lazy" decoding="async"/><figcaption>情境示意</figcaption></figure>}
