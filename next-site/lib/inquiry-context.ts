import {detailPages} from './detail-content';
import {servicePlanner,parsePlanningFocus,planningInterest,planningHref} from './service-planning';
import {consultantExpertise} from './consultant-team';
import {communityTopics,communityHref} from './community-content';
import {inquiryTopics} from './form-fields';
import {parseComparison,comparisonInterest,comparisonHref} from './academy-planning';
import {inquiryTopicCodes} from './inquiry-codes';
/** Legacy links remain valid. Reject repeated, conflicting or unknown compact identifiers. */
export function resolveInquiryQuery(values:URLSearchParams){
 const one=(key:string)=>{const all=values.getAll(key);return all.length===1?all[0]:undefined;};
 const short=one('t'),ref=one('ref'),detail=ref?detailPages.find(p=>p.parent+'/'+p.slug===ref):undefined;
 const invalid=values.has('t')&&(!short||!Object.hasOwn(inquiryTopicCodes,short)||values.has('topic'))||values.has('ref')&&(!detail||values.has('interest'));
 if(invalid)return resolveInquiryContext(undefined,undefined);
 const topic=short?inquiryTopicCodes[short]:one('topic');
 if(detail&&detail.topic!==topic)return resolveInquiryContext(undefined,undefined);
 return resolveInquiryContext(topic,detail?.title??one('interest'),one('from'),one('compare'),one('planning'),one('focus'));
}
export function resolveInquiryContext(rawTopic:unknown,rawInterest:unknown,rawFrom?:unknown,rawComparison?:unknown,rawPlanning?:unknown,rawFocus?:unknown){
 const topic=typeof rawTopic==='string'&&(inquiryTopics as readonly string[]).includes(rawTopic)?rawTopic:'';
 const planner=servicePlanner(rawPlanning);const planning=planner?.topic===topic?planner.id:undefined;const focus=planning?parsePlanningFocus(planning,rawFocus):[];
 const comparison=topic==='企業內訓'?parseComparison(rawComparison):[];
 const interest=planning?planningInterest(planning,focus):comparison.length?comparisonInterest(comparison):typeof rawInterest==='string'?rawInterest.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,200):'';
 const detail=detailPages.find(p=>p.topic===topic&&p.title===interest);
 const expertise=consultantExpertise.findIndex(p=>p.topic===topic&&p.title===interest);
 const teamSource=expertise>=0?{href:`/about#expertise-${expertise+1}`,label:'返回顧問團隊介紹'}:topic==='人才資產發展'&&['二代接班專屬團隊','二代接班協作顧問團隊'].includes(interest)?{href:'/about#succession-team',label:'返回二代接班團隊介紹'}:null;
 const community=communityTopics.find(t=>t.topic===topic&&t.title===interest);
 const from=!planning&&!comparison.length&&rawFrom==='community'&&community?'community' as const:!planning&&!comparison.length&&rawFrom==='team'&&teamSource?'team' as const:undefined;
 const source=planning?{href:planningHref(planning,focus),label:'返回需求整理'}:comparison.length?{href:comparisonHref(comparison),label:'返回內訓方向比較'}:from==='community'?{href:communityHref(community!.id),label:'返回社群交流主題'}:from==='team'?teamSource:detail?{href:`/${detail.parent}/${detail.slug}`,label:detail.kind==='article'?'返回相關文章':detail.kind==='guide'?'返回成果觀察指南':'返回內容說明'}:teamSource;
 return{topic,interest,source,from,comparison,planning,focus,isCourse:comparison.length>0||detail?.kind==='course',isDraftArticle:detail?.kind==='article',isGuide:detail?.kind==='guide'};
}
