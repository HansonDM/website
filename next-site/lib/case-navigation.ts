import {caseCategory} from './case-guides';
import {caseTopicEntry,type CasePreviewEntry} from './case-preview-model';

/** Resolve public category and topic together, so a filter cannot hide a known deep link. */
export function caseNavigationState(value:string|URLSearchParams,hash:string,entries:readonly CasePreviewEntry[]){
 const params=typeof value==='string'?new URLSearchParams(value):value,values=params.getAll('category');
 const requested=caseCategory(values.length===1?values[0]:undefined);
 let id='';try{id=decodeURIComponent(hash.replace(/^#/,''));}catch{/* An invalid fragment is never a topic. */}
 const target=caseTopicEntry(id,entries),recovered=!!target&&requested.id!=='all'&&!target.categories.includes(requested.id);
 return{category:recovered?caseCategory('all'):requested,target:target?.id,recovered};
}
/** Fixed case path and public anchors only; never forward arbitrary URL fields. */
export function caseNavigationHref(value:unknown,anchor:string,entries:readonly CasePreviewEntry[]){
 const category=caseCategory(value),known=['stories','case-guides','company-projects','consultant-experience'].includes(anchor)||!!caseTopicEntry(anchor,entries),hash=known?anchor:'stories';
 const params=new URLSearchParams();if(category.id!=='all')params.set('category',category.id);
 const resolved=caseNavigationState(params,'#'+hash,entries);if(resolved.category.id==='all')params.delete('category');
 return'/cases/'+(params.size?'?'+params:'')+'#'+hash;
}
