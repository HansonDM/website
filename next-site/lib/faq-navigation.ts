import {faqs} from './interior-content';
import {cleanSearchQuery,searchKind} from './site-search';

export const faqCategories=[{id:'all',label:'全部問題'},{id:'ai',label:'AI 數位轉型'},{id:'talent',label:'人才資產發展'},{id:'academy',label:'企業學院'},{id:'cooperation',label:'合作與洽詢'}] as const;
export type FaqCategory=typeof faqCategories[number]['id'];
export function faqCategory(value:unknown):FaqCategory{return faqCategories.some(c=>c.id===value)?value as FaqCategory:'all';}
// Preserve the original, public FAQ anchors used by site search and shared links.
export const faqEntries=faqs.map((faq,index)=>({...faq,id:`faq-${index+1}`,categoryId:faqCategories.find(c=>c.label===faq.category)!.id}));
export function faqEntry(value:unknown){return typeof value==='string'?faqEntries.find(f=>f.id===value):undefined;}
function normalize(value:string){return value.normalize('NFKC').toLocaleLowerCase('zh-TW').replace(/人工智慧|人工智能/g,'ai').replace(/\s/g,'');}
export function findFaqs(query:unknown,category:unknown='all'){
 const terms=cleanSearchQuery(query).normalize('NFKC').split(/\s+/).filter(Boolean).map(normalize),kind=faqCategory(category);
 return faqEntries.filter(f=>(kind==='all'||kind===f.categoryId)&&terms.every(term=>normalize([f.question,f.answer,f.category].join(' ')).includes(term)));
}
export function faqQuestionHref(value:unknown){const entry=faqEntry(value);return entry?`/knowledge/#${entry.id}`:undefined;}
export function faqBrowseHref(query:unknown,category:unknown,siteQuery?:unknown,siteType?:unknown,target?:unknown){
 const params=new URLSearchParams(),q=cleanSearchQuery(query),kind=faqCategory(category),mainQuery=cleanSearchQuery(siteQuery),mainType=searchKind(siteType);
 if(mainQuery)params.set('q',mainQuery);if(mainType!=='all')params.set('type',mainType);
 if(q)params.set('faq_q',q);if(kind!=='all')params.set('faq_topic',kind);
 return '/knowledge'+(params.size?'?'+params.toString():'')+'#'+(faqEntry(target)?.id??'faq');
}
