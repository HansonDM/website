import {articleDetails} from './detail-content';

export const articleCategories=['全部文章','AI 數位轉型','人才資產發展','企業內訓'] as const;
export function articleCategory(value:unknown){return articleCategories.find(c=>c===value)??'全部文章';}
export function articleQuery(value:unknown){return typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,120):'';}
export function findArticle(value:unknown){return typeof value==='string'?articleDetails.find(a=>a.slug===value):undefined;}
export function filterArticles(query:unknown,category:unknown){
 const normalize=(s:string)=>s.normalize('NFKC').toLowerCase().replace(/人工智慧|人工智能/g,'ai').replace(/\s/g,'');
 const terms=articleQuery(query).split(/\s+/).filter(Boolean).map(normalize),kind=articleCategory(category);
 return articleDetails.filter(a=>(kind==='全部文章'||a.topic===kind)&&terms.every(term=>normalize([a.title,a.intro,...a.sections.flatMap(s=>[s.title,...s.paragraphs??[],...s.bullets??[]]),...a.prepare].join(' ')).includes(term)));
}
export function articleLibraryHref(query:unknown,category:unknown){const q=articleQuery(query),kind=articleCategory(category),params=new URLSearchParams();if(q)params.set('article_q',q);if(kind!=='全部文章')params.set('article_topic',kind);return'/knowledge'+(params.size?'?'+params.toString():'')+'#articles';}
export function articleOutline(value:unknown){const article=findArticle(value);return article?[...article.sections.map((s,i)=>({id:`article-section-${i+1}`,title:s.title})),{id:'prepare',title:'帶回工作：兩分鐘整理下一步'}]:[];}
export function articleShareHref(value:unknown,hash:unknown=''){
 const article=findArticle(value);if(!article)return'/knowledge#articles';
 const allowed=new Set(['#content',...articleOutline(value).map(s=>'#'+s.id)]);
 return'/knowledge/'+article.slug+(typeof hash==='string'&&allowed.has(hash)?hash:'');
}
export function articleDiscussionBrief(value:unknown){const article=findArticle(value);if(!article)return'';return['韓森管理顧問有限公司｜文章工作討論單',article.title,'文章內容初稿，供預覽與內容審閱；非Podcast轉錄或客戶實績。','本文件由裝置產生，下載不代表已送出洽詢。','',article.intro,'','閱讀重點',...article.sections.map((s,i)=>`${i+1}. ${s.title}`),'','帶回工作：整理下一步',...article.prepare.flatMap(p=>['・'+p,'我的整理：','']),'我想先採取的一個行動：','可以一起討論的對象：','希望回顧的工作改變：','','請自行決定要保存及分享的內容。', '需要交流時，可至網站洽詢頁確認接收狀態。'].join('\n');}
