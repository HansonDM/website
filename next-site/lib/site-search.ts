import {partnerEcosystem} from './partner-ecosystem';
import {leadConsultant} from './lead-consultant';
import {associateConsultant} from './associate-consultant';
import {clientReferences} from './client-references';
import {organizationSearchText} from './organization-profiles';
import {pages} from './content';
import {podcastEpisodes,podcastEpisodeHref,podcastExcerpt} from './podcast-content';
import {communityTopics,communityHref} from './community-content';
import {servicePlanners,planningHref} from './service-planning';
import {detailPages} from './detail-content';
import {faqs} from './interior-content';
import {consultantExpertise} from './consultant-team';
import {caseTopicHref,type CasePreviewEntry} from './case-preview-model';
import {intakeHelpSearchText} from './intake-help';
import {siteHelpSearchText} from './site-help';

export const searchKinds=[{value:'all',label:'全部內容'},{value:'page',label:'網站與顧問團隊'},{value:'service',label:'服務方案'},{value:'course',label:'內訓規劃'},{value:'company-case',label:'公司專案題材'},{value:'consultant-experience',label:'顧問歷任經驗'},{value:'partnership',label:'合作方向'},{value:'guide',label:'成果觀察指南'},{value:'podcast',label:'Podcast 單集'},{value:'faq',label:'常見問題'}] as const;
export type SearchKind=typeof searchKinds[number]['value'];
export type SearchRecord={id:string;kind:Exclude<SearchKind,'all'>|'article';title:string;summary:string;body:string;href:string;label:string;topic:string};
export const searchRecords:SearchRecord[]=[
 ...podcastEpisodes.map(episode=>({id:'podcast-'+episode.id,kind:'podcast' as const,title:episode.title,summary:podcastExcerpt(episode),body:episode.description,href:podcastEpisodeHref(episode.id)!,label:'Podcast · Firstory 原始單集',topic:'企業解憂事務所'})),
 {id:'home',kind:'page',title:'韓森管理顧問有限公司／企業解憂事務所',summary:'以 AI 賦能企業，以人才資產發展驅動未來。',body:'中小企業 AI 數位轉型，大型企業人才資產發展。企業診斷、組織效能、永續成長。',href:'/',label:'首頁',topic:'企業解憂'},
 ...pages.map(p=>({id:p.slug,kind:'page' as const,title:p.title,summary:p.intro,body:[p.detail,...p.items,p.slug==='about'?[leadConsultant.name,leadConsultant.en,leadConsultant.position,leadConsultant.intro,...leadConsultant.expertise.map(e=>e.title),...leadConsultant.education.flatMap(e=>[e.institution,e.program,e.period]),...leadConsultant.qualifications.flatMap(e=>[e.title,e.issuer]),...leadConsultant.professionalLearning.flatMap(e=>[e.institution,e.program]),...leadConsultant.professionalRoles,...leadConsultant.career.flatMap(e=>[e.organization,e.role,e.scope]),...leadConsultant.teaching.flatMap(e=>[e.title,e.text]),associateConsultant.name,associateConsultant.en,associateConsultant.formalEn,associateConsultant.role,associateConsultant.intro,...associateConsultant.areas,associateConsultant.industryContext,...associateConsultant.qualifications,...associateConsultant.languages,...associateConsultant.education.flatMap(e=>[e.institution,e.program]),...associateConsultant.executiveEducation.flatMap(e=>[e.institution,e.program,e.description]),...associateConsultant.teaching,...associateConsultant.career.flatMap(e=>[e.organization,e.role,e.scope])].join(' '):'',p.slug==='partnerships'?partnerEcosystem.flatMap(p=>[p.name,p.area,p.text,organizationSearchText(p.id)]).join(' '):'',p.slug==='cases'?clientReferences.flatMap(c=>[c.name,c.area,c.summary,c.status,organizationSearchText(c.id)]).join(' '):'',p.slug==='contact'?intakeHelpSearchText:'',siteHelpSearchText(p.slug)].join(' '),href:`/${p.slug}`,label:'主題總覽',topic:p.title})),
 ...communityTopics.map(t=>({id:`community-${t.id}`,kind:'page' as const,title:'社群主題｜'+t.title,summary:t.intro,body:[...t.paragraphs,...t.prompts].join(' '),href:communityHref(t.id),label:'主題交流指南',topic:t.topic})),
 ...servicePlanners.map(p=>({id:`planner-${p.id}`,kind:'page' as const,title:p.title,summary:p.intro,body:[...p.conditions.map(c=>c.label),...p.prompts,'準備事項 需求整理 討論單 下載 服務方向 洽詢'].join(' '),href:planningHref(p.id),label:'需求整理工具',topic:p.topic})),
 ...detailPages.filter(p=>p.kind!=='article').map(p=>({id:`${p.parent}/${p.slug}`,kind:p.kind,title:p.title,summary:p.intro,body:[...p.audience,...p.prepare,...p.sections.flatMap(s=>[s.title,...s.paragraphs??[],...s.bullets??[]]),...p.faq?.flatMap(f=>[f.question,f.answer])??[]].join(' '),href:`/${p.parent}/${p.slug}`,label:p.kind==='article'?'文章 · 內容初稿':p.kind==='course'?'企業內訓 · 規劃方向':p.kind==='partnership'?'合作規劃說明':p.kind==='guide'?'成果觀察指南':'服務規劃說明',topic:p.topic})),
 ...consultantExpertise.map((p,i)=>({id:`team-${i+1}`,kind:'page' as const,title:p.title,summary:p.description,body:p.areas.join(' '),href:'/about#team',label:'顧問團隊專長',topic:p.topic})),
 {id:'succession-team',kind:'page',title:'二代接班協作顧問團隊',summary:'從世代期待對齊、角色與權責調整，到人才培育與轉型落地，整合專業協助釐清接班課題。',body:'企業診斷 專案管理 跨部門溝通 人才發展 一代二代 經驗傳承 二代接班專屬團隊',href:'/about#succession-team',label:'顧問團隊協作',topic:'人才資產發展'},
 ...faqs.map((f,i)=>({id:`faq-${i+1}`,kind:'faq' as const,title:f.question,summary:f.answer,body:'',href:`/knowledge#faq-${i+1}`,label:'常見問題',topic:f.category})),
 {id:'privacy',kind:'page',title:'資料使用告知',summary:'說明洽詢資料用途、保存原則、雲端處理流程及資料權利聯絡方式。',body:'資料查詢 更正 刪除 隱私 Smartsheet',href:'/privacy/',label:'資料使用告知',topic:'聯絡與預約'},
];
export function cleanSearchQuery(value:unknown){return typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,120):'';}
export function searchKind(value:unknown):SearchKind{return searchKinds.some(k=>k.value===value)?value as SearchKind:'all';}
function normalize(text:string){return text.normalize('NFKC').toLocaleLowerCase('zh-TW').replace(/人工智慧|人工智能/g,'ai').replace(/\s/g,'');}
export function caseSearchRecords(entries:readonly CasePreviewEntry[]):SearchRecord[]{return entries.flatMap(entry=>{const href=caseTopicHref(entry.id,entries);if(!href)return[];return[{id:'case-'+entry.id,kind:entry.group==='company'?'company-case' as const:'consultant-experience' as const,title:entry.title,summary:entry.summary,body:[entry.name,entry.status,entry.role,...entry.approach,entry.note].join(' '),href,label:entry.group==='company'?'公司專案題材 · 匿名':'顧問歷任經驗 · 匿名',topic:entry.role}];});}
export function searchSite(query:string,kind:SearchKind='all',entries:readonly CasePreviewEntry[]=[]){
 const terms=cleanSearchQuery(query).split(/\s+/).filter(Boolean).map(normalize);
 return [...searchRecords,...caseSearchRecords(entries)].filter(r=>kind==='all'||r.kind===kind).map(record=>{
  const fields=[[record.title,40],[record.summary,12],[record.topic,8],[record.body,2]] as const;
  let score=0;for(const term of terms){const matches=fields.filter(([text])=>normalize(text).includes(term));if(!matches.length)return null;score+=matches.reduce((sum,[,weight])=>sum+weight,0);}
  return{...record,score};
 }).filter((record):record is SearchRecord&{score:number}=>record!==null).sort((a,b)=>b.score-a.score);
}
export function searchHref(query:string,kind:SearchKind){const params=new URLSearchParams();const q=cleanSearchQuery(query);if(q)params.set('q',q);if(kind!=='all')params.set('type',kind);return'/knowledge/'+(params.size?'?'+params.toString():'')+'#search';}
