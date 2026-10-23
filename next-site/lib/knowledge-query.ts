import {cleanSearchQuery,searchKind} from './site-search';
import {articleQuery,articleCategory} from './article-reading';
import {faqCategory,faqEntry} from './faq-navigation';

/** Only the public knowledge filters enter the browser's in-memory context. */
export function knowledgeQueryString(value:string|URLSearchParams){
 const input=typeof value==='string'?new URLSearchParams(value):value;
 const one=(key:string)=>{const values=input.getAll(key);return values.length===1?values[0]:undefined;};
 const result=new URLSearchParams(),q=cleanSearchQuery(one('q')),type=searchKind(one('type')),article=articleQuery(one('article_q')),articleTopic=articleCategory(one('article_topic')),faq=cleanSearchQuery(one('faq_q')),faqTopic=faqCategory(one('faq_topic'));
 if(q)result.set('q',q);if(type!=='all')result.set('type',type);
 if(article)result.set('article_q',article);if(articleTopic!=='全部文章')result.set('article_topic',articleTopic);
 if(faq)result.set('faq_q',faq);if(faqTopic!=='all')result.set('faq_topic',faqTopic);
 return result.toString();
}
export function knowledgeQueryFromRecord(record:Record<string,string|string[]|undefined>){
 const params=new URLSearchParams();for(const key of ['q','type','article_q','article_topic','faq_q','faq_topic']){const value=record[key];if(typeof value==='string')params.set(key,value);else if(Array.isArray(value))value.forEach(item=>params.append(key,item));}
 return knowledgeQueryString(params);
}

/** Change one public filter family without discarding the other two. */
export function knowledgeFilterHref(value:string|URLSearchParams,family:'search'|'articles'|'faq',query:unknown,category:unknown,target?:unknown){
 const fields={search:['q','type'],articles:['article_q','article_topic'],faq:['faq_q','faq_topic']} as const;
 const keys=fields[family],params=new URLSearchParams(knowledgeQueryString(value));
 keys.forEach(key=>params.delete(key));
 if(typeof query==='string')params.set(keys[0],query);
 if(typeof category==='string')params.set(keys[1],category);
 const normalized=knowledgeQueryString(params),anchor=family==='search'?'search':family==='articles'?'articles':faqEntry(target)?.id??'faq';
 return '/knowledge/'+(normalized?'?'+normalized:'')+'#'+anchor;
}
