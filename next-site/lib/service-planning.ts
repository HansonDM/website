import {detailPages} from './detail-content';

export const planningLimit=3;
export const servicePlanners=[
 {id:'ai',parent:'ai-transformation',topic:'AI 數位轉型',anchor:'readiness',title:'AI 導入準備度自我檢視',en:'YOUR STARTING POINT',intro:'從一個工作難題出發，整理已具備的條件與想討論的方向。',conditions:[
  {id:'workflow',label:'已找到一個具體、重複且希望改善的工作流程',next:'選一個高頻任務，寫下目前步驟、負責角色與反覆發生的困難。'},
  {id:'data',label:'清楚知道所需資料在哪裡、由誰負責',next:'先整理資料來源、管理窗口及可使用範圍，再討論工具串接。'},
  {id:'people',label:'有團隊成員可以參與試行與回饋',next:'確認流程負責人、操作同仁與維護窗口如何參與小範圍試行。'},
  {id:'review',label:'能定義改善前後的比較方式',next:'先約定觀察項目、記錄來源與人工檢查方式，再比較工作中的變化。'}],prompts:['希望先改善的工作情境：','目前使用的工具與資料來源：','可以參與的角色與投入條件：','希望觀察的改變與回顧方式：']},
 {id:'talent',parent:'talent-development',topic:'人才資產發展',anchor:'planning',title:'人才發展需求自我整理',en:'CAREER & TALENT STARTING POINT',intro:'以職涯領導力為核心，連結員工發展、主管支持與組織期待。',conditions:[
  {id:'audience',label:'已釐清希望支持的對象與關鍵職務',next:'先整理對象、角色與工作任務，避免用單一工具概括所有人的發展需求。'},
  {id:'context',label:'已整理工作情境與可討論的發展議題',next:'從工作觀察、發展對話與組織方向，找出值得先討論的議題。'},
  {id:'support',label:'有主管或人資夥伴參與後續支持',next:'確認主管、人資與參與者可提供的支持，讓學習連結日常工作。'},
  {id:'review',label:'已想過如何回顧工作中的改變',next:'約定以哪些工作證據與發展對話回顧進展，並說明資料使用範圍。'}],prompts:['希望支持的對象與關鍵職務：','目前的發展議題與工作情境：','主管、人資與組織可提供的支持：','希望回顧的工作改變與發展價值：']}
] as const;
export type PlanningId=typeof servicePlanners[number]['id'];
export function servicePlanner(value:unknown){return typeof value==='string'?servicePlanners.find(p=>p.id===value):undefined;}
export function planningOptions(value:unknown){const plan=servicePlanner(value);return plan?detailPages.filter(p=>p.kind==='service'&&p.parent===plan.parent):[];}
export function parsePlanningFocus(value:unknown,raw:unknown):string[]{
 if(typeof raw!=='string')return[];
 const allowed=new Set(planningOptions(value).map(p=>p.slug));
 return [...new Set(raw.slice(0,400).split(',').map(s=>s.trim()).filter(s=>allowed.has(s)))].slice(0,planningLimit);
}
export function planningSelection(value:unknown,ids:readonly string[]){return parsePlanningFocus(value,ids.join(',')).map(slug=>planningOptions(value).find(p=>p.slug===slug)!);}
export function planningInterest(value:unknown,ids:readonly string[]){const plan=servicePlanner(value);return planningSelection(value,ids).map(p=>p.title).join('／')||(plan?`${plan.topic}需求整理`:'');}
export function planningHref(value:unknown,ids:readonly string[]=[]){const plan=servicePlanner(value);if(!plan)return'/contact#inquiry';const focus=parsePlanningFocus(plan.id,ids.join(',')),query=new URLSearchParams();if(focus.length)query.set('focus',focus.join(','));return`/${plan.parent}`+(query.size?'?'+query.toString():'')+'#'+plan.anchor;}
export function planningInquiryHref(value:unknown,ids:readonly string[]){const plan=servicePlanner(value);if(!plan)return'/contact#inquiry';const query=new URLSearchParams({topic:plan.topic,planning:plan.id});const focus=parsePlanningFocus(plan.id,ids.join(','));if(focus.length)query.set('focus',focus.join(','));return'/contact?'+query.toString()+'#inquiry';}
export function planningBrief(value:unknown,ids:readonly string[],ready:readonly string[]){const plan=servicePlanner(value);if(!plan)return'';const selected=planningSelection(plan.id,ids);return['韓森管理顧問有限公司｜'+plan.topic+'需求討論單','供需求交流準備使用，非正式評鑑或服務方案承諾。','此文件由裝置產生；下載不代表已送出洽詢。','','一、想討論的服務方向',...(selected.length?selected.map(p=>'・'+p.title):['尚未選定，可先討論目前的課題。']),'','二、準備事項',...plan.conditions.flatMap(c=>[`${ready.includes(c.id)?'已整理':'待確認'}：${c.label}`,...(ready.includes(c.id)?[]:['建議：'+c.next])]),'','三、可補充的討論資訊',...plan.prompts,'','請勿在討論單填入員工個別評量結果、客戶資料或機密內容。','準備事項不會自動帶入洽詢表單；可自行決定要分享的內容。','正式接收狀態請以網站洽詢頁顯示為準。'].join('\n');}
