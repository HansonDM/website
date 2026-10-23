import {parseComparison} from './academy-planning';

export const academyCategories=[
 {id:'all',label:'全部方向'},
 {id:'digital',label:'AI 與數位'},
 {id:'leadership',label:'領導與管理'},
 {id:'collaboration',label:'組織與協作'},
] as const;
export function academyBrowseState(value:string|URLSearchParams){
 const params=typeof value==='string'?new URLSearchParams(value):value;
 const one=(key:string)=>{const values=params.getAll(key);return values.length===1?values[0]:undefined;};
 const query=(one('course_q')??'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,120);
 const category=academyCategories.find(c=>c.id===one('course_topic'))??academyCategories[0];
 return{query,category:category.id,selected:parseComparison(one('compare'))};
}
/** Only course lookup terms, category IDs and known comparison IDs enter this URL. */
export function academyBrowseHref(value:string|URLSearchParams,changes:{query?:string;category?:string;selected?:readonly string[]}={},hash='#internal'){
 const current=academyBrowseState(value),params=new URLSearchParams();
 const query=changes.query??current.query,category=changes.category??current.category,selected=changes.selected??current.selected;
 if(query)params.set('course_q',query);if(category!=='all')params.set('course_topic',category);if(selected.length)params.set('compare',selected.join(','));
 const state=academyBrowseState(params),clean=new URLSearchParams();
 if(state.query)clean.set('course_q',state.query);if(state.category!=='all')clean.set('course_topic',state.category);if(state.selected.length)clean.set('compare',state.selected.join(','));
 const anchor=['#internal','#compare','#public','#custom',''].includes(hash)?hash:'#internal';
 return '/academy/'+(clean.size?'?'+clean:'')+anchor;
}
