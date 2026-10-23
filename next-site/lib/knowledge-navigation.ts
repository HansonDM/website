'use client';
import {knowledgeFilterHref} from './knowledge-query';
export const knowledgeNavigationEvent='hanson:knowledge-navigation';
/** Public URL only; never carries form fields or a history-state payload. */
export function navigateKnowledgeFilters(family:'search'|'articles'|'faq',query:unknown,category:unknown,mode:'push'|'replace'='push',target?:unknown){
 const href=knowledgeFilterHref(window.location.search,family,query,category,target);
 if(mode==='replace')window.history.replaceState(null,'',href);else window.history.pushState(null,'',href);
 window.dispatchEvent(new Event(knowledgeNavigationEvent));
}
