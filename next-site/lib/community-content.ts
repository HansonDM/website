import {detailPages,type ContentDetail} from './detail-content';
import {inquiryHref} from './inquiry-links';

export const communityTopics=[
 {id:'ai-practice',title:'AI 應用與流程實作',topic:'AI 數位轉型',en:'AI IN EVERYDAY WORK',intro:'從一個反覆發生的工作任務，找到可以一起交流的 AI 與流程改善議題。',paragraphs:['先把工作現況說清楚：誰在什麼時候需要哪些資料、目前如何處理、哪些步驟需要判斷。讓交流從具體情境開始，再討論 AI、工具或自動化的角色。','閱讀流程整理文章後，可以對照導入規劃與自動化服務，或從內訓方向了解團隊需要練習的能力。實際範圍與安排再依需求確認。'],prompts:['選一個想先改善的高頻任務','整理資料來源、操作角色與例外情境','描述希望觀察的工作改變'],resources:['/knowledge/start-with-one-workflow','/ai-transformation/adoption','/ai-transformation/automation','/academy/workflow-automation']},
 {id:'career-growth',title:'職涯發展與組織支持',topic:'人才資產發展',en:'CAREER & ORGANIZATIONAL SUPPORT',intro:'以職涯領導力為核心，連結員工的發展方向、主管支持與企業的人才策略。',paragraphs:['人才發展可以先從一場有方向的對話開始。把工作中的觀察、員工的發展意願與角色期待放在一起，討論可以嘗試的行動與需要的支持。','從人才盤點文章延伸到職涯領導力與雇主品牌服務，思考企業如何把發展支持落實在工作與員工經驗中。交流時可先描述整體情境，無須提供員工個別評量結果。'],prompts:['釐清希望支持的對象與關鍵角色','整理主管、人資與組織可提供的支持','討論如何回顧發展行動與工作中的改變'],resources:['/knowledge/evidence-based-talent-conversation','/talent-development/career-leadership','/talent-development/employer-brand-evp','/academy/talent-review']},
 {id:'team-learning',title:'主管帶領與跨部門協作',topic:'企業內訓',en:'LEADERSHIP & TEAM LEARNING',intro:'從回饋、授權與跨部門合作的日常情境，整理團隊下一階段的學習課題。',paragraphs:['想安排一堂課之前，可以先描述哪些工作需要更多協作、目前彼此的期待有何落差，以及課後希望出現哪些具體行動。讓課程與團隊的實際任務連在一起。','從內訓需求文章開始，再了解企業診斷與主管培育的服務方向，或閱讀跨部門協作的課程規劃。課程、講師、形式與時程依需求討論，尚無此主題的已公告活動。'],prompts:['描述一個需要改善的管理或協作情境','整理參與對象與跨部門的共同任務','說明課後期待的行動與主管支持'],resources:['/knowledge/training-needs-brief','/talent-development/leadership','/talent-development/organizational-diagnosis','/academy/team-collaboration']}
] as const;
export function communityTopic(value:unknown){return typeof value==='string'?communityTopics.find(t=>t.id===value):undefined;}
export function communityHref(value:unknown){const topic=communityTopic(value);return'/community'+(topic?'?'+new URLSearchParams({theme:topic.id}).toString():'')+'#topics';}
export function communityInquiryHref(value:unknown){const topic=communityTopic(value);return topic?inquiryHref(topic.topic,topic.title,'community'):'/contact#inquiry';}
export function communityResources(value:unknown):ContentDetail[]{const topic=communityTopic(value);return topic?topic.resources.map(href=>detailPages.find(p=>`/${p.parent}/${p.slug}`===href)).filter((p):p is ContentDetail=>!!p):[];}
export const communityFaq=[
 {question:'目前可以直接加入官方社群嗎？',answer:'六個平台的官方帳號網址仍在確認中。本站暫不提供加入或追蹤外連，可先從主題內容了解服務與交流方向。'},
 {question:'閱讀文章或選擇主題，會自動訂閱通知嗎？',answer:'不會。主題選擇只用來瀏覽本站公開內容，不會建立會員、訂閱通知或送出個人資料。'},
 {question:'想進一步交流，需要準備什麼？',answer:'可先整理想討論的工作情境、對象與期待，再從主題前往洽詢。表單會顯示當下接收狀態；提出需求不代表已加入社群、報名活動或完成預約。'}
];
