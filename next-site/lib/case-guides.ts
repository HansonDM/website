import type {ContentDetail} from './detail-content';

export const caseCategories=[{id:'all',label:'全部'},{id:'ai',label:'AI 數位轉型'},{id:'talent',label:'人才資產發展'},{id:'learning',label:'企業內訓'}] as const;
export function caseCategory(value:unknown){return caseCategories.find(c=>c.id===value)??caseCategories[0];}
export function casesHref(value:unknown,anchor:'stories'|'case-guides'='stories'){const category=caseCategory(value);return'/cases'+(category.id==='all'?'':'?'+new URLSearchParams({category:category.id}).toString())+'#'+anchor;}

export const caseGuideDetails:ContentDetail[]=[
 {parent:'cases',slug:'ai-observation',title:'AI 導入的流程與服務觀察',en:'OBSERVING AI IN PRACTICE',intro:'先對齊工作範圍與資料口徑，再閱讀流程、採用與服務中的改變。',kind:'guide',label:'成果觀察指南',topic:'AI 數位轉型',audience:['希望了解AI導入如何回應工作課題的經營者與主管','參與流程改善、客服與知識應用的團隊'],sections:[
  {title:'先確認，想改善的是哪一段工作',paragraphs:['閱讀AI或自動化服務的成果時，可以先了解原來的工作情境、參與對象與實施範圍。不同部門、任務與資料條件，適合觀察的改變也可能不同。','先把要處理的任務、保留的人工判斷與試行範圍說清楚，才能理解工具在流程中實際扮演的角色。']},
  {title:'從日常工作中整理觀察依據',bullets:['流程步驟、人工輸入與交接方式如何改變','是否能追蹤例外、失敗通知與人工接手','知識回覆是否有來源、更新窗口與檢查紀錄','操作同仁如何使用，以及後續維護由誰負責']},
  {title:'先對齊比較方式，再解讀數字',paragraphs:['若要比較完成時間、重複處理或服務回覆，應先說明任務範圍、資料來源、觀察期間與計算方式。不同條件下的數字，不宜直接當成同一種改變。','數字可以搭配實際流程紀錄、人工查核與使用者回饋閱讀，並交代仍需處理的例外及限制。']},
  {title:'把回顧連結到下一步',bullets:['檢查目前做法是否被團隊採用與持續維護','整理仍需要人工處理或補充資料的部分','依觀察結果討論下一個範圍清楚的改善議題']}
 ],prepare:['一個希望先改善的工作任務','目前使用的工具、資料來源與負責角色','已知的例外情境與需要人工判斷的部分','想比較的工作變化及可取得的觀察依據'],faq:[{question:'這份指南包含已驗證的客戶成果嗎？',answer:'本頁是服務成果的閱讀與討論指南，沒有呈現客戶實績。正式案例需先核實內容並取得客戶授權。'},{question:'可以直接沿用別人的改善幅度嗎？',answer:'應先了解任務、範圍、資料與觀察方式。是否適用於自己的企業，需要依現況討論，不能將個別案例視為固定成效承諾。'}],related:[{href:'/ai-transformation/adoption',title:'AI 導入規劃'},{href:'/ai-transformation/automation',title:'n8n 與流程自動化'},{href:'/knowledge/start-with-one-workflow',title:'從一個工作流程開始整理'}]},
 {parent:'cases',slug:'talent-observation',title:'人才發展的行動與組織觀察',en:'OBSERVING PEOPLE DEVELOPMENT',intro:'以職涯領導力為核心，從發展行動、主管支持與組織回顧理解投入的價值。',kind:'guide',label:'成果觀察指南',topic:'人才資產發展',audience:['規劃人才與職涯發展的經營團隊、人資及主管','希望連結員工發展與組織期待的團隊'],sections:[
  {title:'先對齊人才發展的目的與對象',paragraphs:['人才發展的成果，可以從希望支持的對象、關鍵角色與工作任務開始理解。以職涯領導力為核心，連結員工發展方向、主管支持與企業的人才策略。','先了解盤點、發展對話、學習歷練與支持安排之間的關係，再討論哪些工作中的改變值得持續觀察。']},
  {title:'從發展行動與工作支持理解進展',bullets:['是否形成可討論、可回顧的發展目標與行動','主管與人資如何提供回饋、歷練及資源支持','參與者如何把學習與發展行動帶回工作','跨角色對人才標準與責任的理解是否更清楚']},
  {title:'把不同的觀察放在一起閱讀',paragraphs:['工作觀察、發展對話與行動紀錄，可以提供不同角度的資訊。企業員工評量工具的結果應在已確認的目的與使用範圍中理解，避免以單一結果概括整個人的發展。','討論雇主品牌、員工價值主張或社會影響力時，也需要說明觀察對象、資料來源、期間與限制；不把員工發展投入直接等同於未經確認的成效數字。']},
  {title:'讓回顧支持後續的發展選擇',bullets:['回顧發展行動與支持安排是否能持續落實','整理角色期待、組織條件與仍待釐清的議題','依觀察調整下一階段的學習、歷練與主管支持']}
 ],prepare:['希望支持的對象與關鍵角色','目前人才盤點、發展對話或培育安排','主管、人資與組織可以提供的支持','希望回顧的工作改變與可公開討論的觀察'],faq:[{question:'觀察人才發展一定要用單一分數嗎？',answer:'可先對齊目的、對象與觀察方式，結合工作情境、發展對話及行動紀錄討論。工具結果需要在使用範圍與限制下理解。'},{question:'交流前需要提供個別員工評量結果嗎？',answer:'初次可先說明整體對象、工作情境與發展課題，個別資料的使用目的、權限及分享範圍需先確認。'}],related:[{href:'/talent-development/career-leadership',title:'職涯領導力與人才發展'},{href:'/talent-development/social-impact',title:'ESG 社會面與社會影響力'},{href:'/knowledge/evidence-based-talent-conversation',title:'從工作證據展開發展對話'}]},
 {parent:'cases',slug:'learning-observation',title:'企業內訓的學習與工作應用觀察',en:'OBSERVING LEARNING AT WORK',intro:'從企業的工作課題出發，連結學習目標、練習成果與課後行動。',kind:'guide',label:'成果觀察指南',topic:'企業內訓',audience:['安排企業內訓的人資、用人主管與學習發展夥伴','希望讓學習連結工作任務的團隊'],sections:[
  {title:'先說清楚，希望學習支持什麼工作',paragraphs:['閱讀內訓成果之前，可以先了解參與對象、工作情境與課程目標。相同的主題名稱，可能因企業任務、角色與先備經驗而有不同的內容安排。','課程是否貼近需要，不只看活動本身，也可以回到原先希望改善的工作課題，理解練習與後續行動如何連結。']},
  {title:'把課程中的練習與課後應用連起來',bullets:['學習目標是否對應參與者實際會遇到的任務','課程練習是否產生可帶回工作的整理或做法','課後是否有可討論的行動及主管支持','回顧時能否描述哪些做法已嘗試、哪些仍需調整']},
  {title:'分開閱讀學習感受與工作改變',paragraphs:['參與回饋、練習紀錄與課後的工作觀察，回答的是不同問題。可以先說明各自的用途、蒐集方式與限制，再一起討論學習帶來的改變。','若觀察到工作結果的變化，也要交代觀察期間與其他影響條件，不將所有變化直接歸因於單一課程。']},
  {title:'把一次學習延伸為可以回顧的行動',bullets:['選一項範圍清楚、可以嘗試的工作行動','討論主管或團隊可提供的支持與回饋','依工作中的觀察調整下一階段的學習安排']}
 ],prepare:['參與對象、工作角色與先備經驗','希望透過學習支持的工作課題','課後期待的行動及可提供的主管支持','可以回顧的工作觀察與安排條件'],faq:[{question:'課程回饋能直接代表工作成效嗎？',answer:'可以分別看參與感受、學習練習與課後應用；各自反映的資訊不同，需先對齊觀察方式與限制，再一起閱讀。'},{question:'這裡已經公告課程日期或固定方案嗎？',answer:'本頁是成果觀察指南，沒有公告開班日期、講師、時數、價格或固定成效。實際內訓內容與安排依需求確認。'}],related:[{href:'/academy',title:'企業學院與內訓方向'},{href:'/academy/team-collaboration',title:'跨部門協作與問題解決'},{href:'/knowledge/training-needs-brief',title:'把內訓需求說得更具體'}]}
];
export function caseGuidesFor(value:unknown){const category=caseCategory(value);return category.id==='all'?caseGuideDetails:caseGuideDetails.filter(g=>g.topic===category.label);}
export function guideParentHref(value:unknown){const guide=typeof value==='string'?caseGuideDetails.find(g=>g.slug===value):undefined;return casesHref(caseCategories.find(c=>c.label===guide?.topic)?.id,'case-guides');}
