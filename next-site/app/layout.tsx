import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import WebChat from '@/components/WebChat';
import VoiceInputProvider from '@/components/VoiceInputProvider';
import {siteOrigin,homeTitle,homeDescription} from '@/lib/site-metadata';
import {publicContact} from '@/lib/public-contact';
import './globals.css';
export const metadata: Metadata={metadataBase:new URL(siteOrigin),title:{default:homeTitle,template:'%s｜韓森管理顧問'},description:homeDescription};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant" data-scroll-behavior="smooth"><body><a href="#main" className="skip">跳至主要內容</a><link rel="preconnect" href="https://hansondm.app.n8n.cloud" crossOrigin="anonymous"/><VoiceInputProvider><Header/>{children}<footer><div><strong>HANSON</strong><p>韓森管理顧問有限公司 · 企業解憂事務所</p><small>以 AI 賦能企業，以人才資產發展驅動未來</small></div><nav className="footer-links" aria-label="頁尾導覽"><Link href="/about">關於韓森</Link><Link href="/academy">企業學院</Link><Link href="/cases">成功案例</Link><Link href="/knowledge">解憂知識中心</Link><Link href="/partnerships">共創合作夥伴</Link><Link href="/community">社群中心</Link><Link href="/privacy/">資料使用告知</Link></nav><div><address className="footer-contact"><a href="mailto:Hanson.lin@hansondm.com">Hanson.lin@hansondm.com</a><br/><a href={publicContact.phoneHref}>聯絡電話（林明輝）：{publicContact.phone}</a><p>{publicContact.addressLabel}<br/>{publicContact.address}</p></address><Link href="/contact">一起討論下一步 ↗</Link><p>© {new Date().getFullYear()} Hanson Consulting.</p><small>{process.env.WEBSITE_RELEASE_MODE==='production'?'內容持續更新':'網站開發原型 · 內容持續核對中'}</small></div></footer><WebChat/></VoiceInputProvider></body></html>}
