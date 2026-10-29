/** One topic-specific cover and editorial summary per public resource. Draft articles have no entry. */
export const communityResourceDesigns:Record<string,{id:string;title:string;summary:string;context:string;cta:string;alt:string}>={
 '/ai-transformation/adoption':{id:'ai-adoption',title:'先選對 AI 試行的起點',summary:'釐清誰在做、資料從哪裡來，以及哪些步驟需要人工確認，再選一項任務試行。',context:'已試過 AI 工具，卻還沒有共同的導入優先順序。',cta:'釐清 AI 導入方向',alt:'兩人以任務卡與資料流程圖，討論一項AI試行任務的情境示意'},
 '/ai-transformation/automation':{id:'workflow-automation',title:'讓資料、判斷與通知接起來',summary:'從表單到資料整理與通知，盤點每個系統的責任，並把例外處理與人工接手一併納入。',context:'重複搬資料、漏通知，或出錯時找不到處理節點。',cta:'了解 n8n 與流程串接',alt:'流程專員檢視包含資料、條件分支及例外提醒的自動化工作流情境示意'},
 '/academy/workflow-automation':{id:'workflow-training',title:'把一個流程，變成團隊的共同練習',summary:'透過任務拆解與流程圖討論，辨識重複作業、交接斷點及需要人工判斷的位置。',context:'希望團隊能先看懂流程，再討論自動化工具。',cta:'查看流程優化內訓方向',alt:'工作坊學員在白板上排列任務與交接卡片，練習流程優化的情境示意'},
 '/talent-development/career-leadership':{id:'career-leadership',title:'從職涯對話，找到可以實踐的下一步',summary:'把員工的發展方向、主管支持與組織角色期待放在一起，討論具體的工作歷練與支持方式。',context:'想讓人才發展從一次談話延伸到日常工作。',cta:'了解職涯領導力服務',alt:'主管與員工一起檢視成長筆記，進行職涯發展對話的情境示意'},
 '/talent-development/employer-brand-evp':{id:'employer-brand',title:'讓雇主承諾，回到員工的真實經驗',summary:'從學習、工作方式與成長支持整理員工價值主張，對齊企業說法與員工實際感受。',context:'希望雇主品牌同時連結招募溝通與內部人才支持。',cta:'探索雇主品牌與 EVP',alt:'團隊以學習、貢獻與協作圖卡，討論員工價值主張的情境示意'},
 '/academy/talent-review':{id:'talent-review',title:'用工作證據，練習一場人才盤點對話',summary:'從職務期待、能力觀察與工作事例整理討論依據，練習提出發展方向，而非只做分數排名。',context:'主管與人資對人才標準及觀察依據還沒有共識。',cta:'查看人才盤點內訓方向',alt:'人資與主管檢視匿名職務卡及能力觀察矩陣，練習人才盤點的情境示意'},
 '/talent-development/leadership':{id:'manager-coaching',title:'把回饋與授權，落在一次具體的帶領',summary:'從日常工作情境拆解回饋、授權與支持，討論主管可以調整的行動與團隊需要的協助。',context:'主管知道方向，卻卡在溝通與執行的現場。',cta:'了解領導力培育服務',alt:'主管與同事練習回饋對話，另一位夥伴觀察與記錄的情境示意'},
 '/talent-development/organizational-diagnosis':{id:'organizational-diagnosis',title:'先看清跨部門卡點，再找協作方式',summary:'整理共同任務、角色權責與資訊交接，透過企業診斷釐清問題脈絡，討論後續改善優先順序。',context:'事情持續來回，部門之間對責任與期待有落差。',cta:'探索企業診斷與溝通',alt:'不同部門一起檢視原因樹與交接流程，找出協作卡點的情境示意'},
 '/academy/team-collaboration':{id:'team-collaboration',title:'讓共同目標，成為可以練習的協作',summary:'透過團隊任務討論角色、交接與回饋，把課堂練習連回跨部門的真實共同工作。',context:'希望一次內訓能連結團隊正在面對的協作情境。',cta:'查看跨部門協作內訓',alt:'兩組夥伴共同完成桌面橋樑模型，練習跨部門交接與協作的情境示意'}
};
export function communityResourceDesign(href:string){const item=communityResourceDesigns[href];return item?{...item,src:'/community-covers/'+item.id+'.webp',width:1279,height:720}:undefined;}
