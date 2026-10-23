import {communityTopic,communityTopics} from './community-content';

export function communityNavigationState(value:string|URLSearchParams,hash:string){
 const params=typeof value==='string'?new URLSearchParams(value):value,values=params.getAll('theme');
 const query=communityTopic(values.length===1?values[0]:undefined);
 let id='';try{id=decodeURIComponent(hash.replace(/^#/,''));}catch{/* Invalid fragments never select content. */}
 const anchored=id.startsWith('community-topic-')?communityTopic(id.slice('community-topic-'.length)):undefined;
 return{topic:anchored??query??communityTopics[0],anchor:anchored?'community-topic-'+anchored.id:undefined,normalize:!!anchored&&(values.length!==1||values[0]!==anchored.id)};
}
/** Only existing public theme IDs and matching reading anchors enter the URL. */
export function communityNavigationHref(value:unknown,anchor='topics'){
 const topic=communityTopic(value)??communityTopics[0],hash=anchor==='community-topic-'+topic.id?anchor:'topics';
 return'/community/?'+new URLSearchParams({theme:topic.id})+'#'+hash;
}
