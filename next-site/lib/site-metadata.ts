import {privacyNotice} from './privacy-notice';
import type {Metadata,MetadataRoute} from 'next';
import {pages} from './content';
import {detailPages} from './detail-content';

// Server-side metadata only. Use the approved production origin, never request queries or intake data.
export const siteOrigin='https://www.hansondm.com';
export const siteName='韓森管理顧問有限公司／企業解憂事務所';
export const homeTitle='韓森管理顧問有限公司｜企業解憂事務所';
export const homeDescription='以 AI 賦能企業，以人才資產發展驅動未來。從 AI 數位轉型、人才資產發展到企業學院，陪伴企業走向下一階段。';
export type SiteDocument={path:string;title:string;description:string;image:string;imageAlt:string;imageWidth:number;imageHeight:number;noindex:boolean;follow:boolean};
const summary=(text:string)=>text.replace(/\s+/g,' ').trim().slice(0,160);
const banner=(theme:string)=>({image:`/banners/${theme}.jpg`,imageAlt:'韓森管理顧問｜主題情境示意',imageWidth:1774,imageHeight:887});
const articleThemes:Record<string,string>={'AI 數位轉型':'ai-transformation','人才資產發展':'talent-development','企業內訓':'academy'};

export const siteDocuments:SiteDocument[]=[
 {path:'/',title:homeTitle,description:homeDescription,image:'/HANSON_LOGO_B_0.jpg',imageAlt:'韓森管理顧問有限公司官方金色 H Logo',imageWidth:1024,imageHeight:723,noindex:false,follow:true},
 ...pages.map(page=>({path:`/${page.slug}`,title:page.title,description:summary(page.intro+' '+page.detail),...banner(page.slug),noindex:false,follow:true})),
 ...detailPages.map(page=>({path:`/${page.parent}/${page.slug}`,title:page.title+(page.kind==='article'?'（初稿）':''),description:summary(page.intro+' '+(page.kind==='article'?'本文為原創文章初稿，供工作討論參考，尚未核定為正式文章。':page.kind==='course'?'企業內訓規劃方向；課綱、講師、時數、日期與費用依需求確認，尚未公告公開班。':page.kind==='guide'?'成果觀察與需求討論指南，不代表已驗證的客戶實績。':page.label+'，實際範圍依需求確認。')),...banner(page.kind==='article'?articleThemes[page.topic]??page.parent:page.parent),noindex:page.kind==='article',follow:true})),
 {path:'/privacy',title:privacyNotice.published?'資料使用告知':'資料使用告知（草稿）',description:privacyNotice.published?'韓森管理顧問網站洽詢資料的用途、保存、處理及資料權利聯絡方式。':'資料使用告知草稿。已提供保存原則與公開聯絡信箱；清理方式、接收主機與資料處理地區仍待確認，線上洽詢接收尚未啟用。',...banner('contact'),noindex:true,follow:false},
];

export function siteDocument(value:unknown){
 if(typeof value!=='string'||!/^\/(?!\/)/.test(value)||/[\\\u0000-\u001f\u007f]/.test(value))return undefined;
 const path=value.split(/[?#]/,1)[0].replace(/\/+$/,'')||'/';
 return siteDocuments.find(document=>document.path===path);
}
export function canonicalHref(value:unknown){const document=siteDocument(value);return document?siteOrigin+(document.path==='/'?'/':document.path+'/'):null;}
export function pageMetadata(value:unknown,casePreview=false):Metadata{
 const document=siteDocument(value);
 if(!document)return{title:{absolute:'找不到頁面｜韓森管理顧問'},robots:{index:false,follow:false},alternates:{canonical:null}};
 const url=canonicalHref(document.path)!,title=document.path==='/'?document.title:document.title+'｜韓森管理顧問',imageUrl=siteOrigin+document.image;
 return {
  title:{absolute:title},description:document.description,alternates:{canonical:url},
  robots:{index:!document.noindex&&!(casePreview&&document.path==='/cases'),follow:document.follow&&!(casePreview&&document.path==='/cases')},
  openGraph:{type:'website',locale:'zh_TW',siteName,title,description:document.description,url,images:[{url:imageUrl,width:document.imageWidth,height:document.imageHeight,alt:document.imageAlt}]},
  twitter:{card:'summary_large_image',title,description:document.description,images:[{url:imageUrl,alt:document.imageAlt}]},
 };
}
export function sitemapEntries(casePreview=false):MetadataRoute.Sitemap{return siteDocuments.filter(document=>!document.noindex&&!(casePreview&&document.path==='/cases')).map(document=>({url:canonicalHref(document.path)!}));}
export function robotsPolicy():MetadataRoute.Robots{return{rules:{userAgent:'*',allow:'/',disallow:['/api/','/testing/','/preview.html']},sitemap:siteOrigin+'/sitemap.xml'};}
