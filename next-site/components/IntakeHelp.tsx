import Link from 'next/link';
import {intakeHelp} from '@/lib/intake-help';
import {privacyNotice} from '@/lib/privacy-notice';
import {SectionHeading} from './InteriorUI';
export default function IntakeHelp(){return <section id="receipt-help" className="interior-section" aria-labelledby="receipt-help-title"><div id="receipt-help-title"><SectionHeading eyebrow="AFTER YOUR INQUIRY" title="已送出需求，接下來怎麼做？" description="保存送出編號，了解收件、確認信與後續聯繫方式。"/></div><div className="faq-list">{intakeHelp.map(item=><details id={`receipt-help-${item.id}`} key={item.id}><summary><span>{item.question}</span><span aria-hidden="true">＋</span></summary><div><p>{item.answer}</p></div></details>)}</div><aside className="content-note">收件與資料處理窗口：<a href={'mailto:'+privacyNotice.contact}>{privacyNotice.contact}</a>。<Link href="/privacy/">閱讀資料使用告知 →</Link></aside></section>}
