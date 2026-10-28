import {aiServices,talentServices,academyDirections} from './interior-content';
import {extendedServiceDetails} from './extended-services';
import {partnershipDetails} from './partnership-planning';
import {caseGuideDetails} from './case-guides';
export type ContentSection={title:string;paragraphs?:string[];bullets?:string[]};
export type ContentDetail={parent:string;slug:string;title:string;en:string;intro:string;kind:'service'|'course'|'article'|'partnership'|'guide';label:string;audience:string[];sections:ContentSection[];prepare:string[];topic:string;faq?:{question:string;answer:string}[];related?:{href:string;title:string}[]};
const aiExtras:Record<string,{audience:string[];situation:string;work:string[];prepare:string[]}>={
 adoption:{audience:['希望從第一個 AI 應用開始的企業','需要整合部門導入需求的主管'],situation:'已經試過幾種工具，卻還不確定哪些工作適合導入；各部門期待不同，也缺少共同的優先順序。',work:['選出一項範圍明確、可以比較前後差異的工作','整理任務步驟、資料來源與必須由人判斷的部分','討論試行目標、參與角色與檢視方法'],prepare:['一個希望改善的任務與目前做法','負責部門、參與角色及可投入的時間','可供討論的去識別化資料範例']},
 automation:{audience:['需要處理跨系統資料的營運團隊','希望減少重複輸入與追蹤工作的流程負責人'],situation:'表單填完仍要人工建檔，資訊在多個工具間搬移；流程出錯時，也不容易知道哪個環節需要處理。',work:['畫出觸發、資料處理、判斷與通知節點','確認每個系統的資料欄位、存取條件及負責人','規劃重複事件處理、失敗提示與人工補救路徑'],prepare:['目前使用的系統清單與流程示意','常見錯誤、例外情境與人工處理方式','系統管理窗口與資料可使用範圍']},
 assistant:{audience:['需要回應重複問題的服務團隊','希望讓員工更容易找到內部知識的企業'],situation:'答案散落在文件、網站與同事的經驗裡；想使用 AI 回答問題，卻擔心內容沒有依據、資訊過時或無法轉由人處理。',work:['選定知識範圍、原始來源與更新責任','整理可回答、需確認與必須人工處理的問題','以真實提問樣本檢查回覆、來源及轉接流程'],prepare:['常見問題與現有答案','知識文件位置、版本與可用權限','應轉由人處理的問題類型']},
 data:{audience:['需要建立共同指標的經營與營運團隊','希望改善報表使用方式的部門主管'],situation:'報表很多，卻回答不了正在討論的經營問題；不同部門對數字的定義不同，也不清楚資料何時更新。',work:['從管理問題反推需要追蹤的指標','確認資料粒度、計算口徑、更新頻率與負責人','設計可讀的看板及固定檢視節奏'],prepare:['目前使用的報表與希望回答的問題','關鍵欄位、資料來源及已知限制','誰會使用資訊，以及要支持什麼決策']}
};
const talentExtras:Record<string,{audience:string[];situation:string;work:string[];prepare:string[]}>={
 standards:{audience:['正在調整職務與能力要求的企業','需要建立共同人才語言的人資與主管'],situation:'對「表現好」的描述過於抽象，不同主管期待不一致，招募、績效與培育也缺少共同的討論基礎。',work:['選出優先釐清的職務與關鍵工作任務','把抽象能力改寫為可觀察的具體行為','透過主管討論檢視標準能否用於實際工作'],prepare:['職務說明與主要工作任務','既有職能或績效資料','需要參與標準對齊的主管名單']},
 inventory:{audience:['準備進行人才盤點的人資團隊','希望讓發展對話更具體的管理者'],situation:'盤點容易變成印象評分，討論結束後卻沒有對應的發展行動；不同部門也可能使用不同標準。',work:['確認盤點目的、對象與結果使用方式','整理工作證據，對齊主管觀察與討論方式','將盤點結果連結到發展、歷練與追蹤安排'],prepare:['盤點對象與預計討論的職務範圍','可使用的工作表現資料','資料存取與結果使用的內部規則']},
 assessment:{audience:['規劃人才發展工具的人資夥伴','希望理解工作風格差異的主管'],situation:'想透過工具加深對團隊的理解，但不確定工具是否符合目的、如何說明結果，以及如何回到工作發展。',work:['先確認使用目的、工具適用範圍與授權','規劃參與說明、資料可見範圍及結果回饋方式','結合工作情境討論發展行動，不單憑結果做決策'],prepare:['預計使用工具的目的與對象','現有工具、授權與說明文件（如有）','內部資料使用及結果回饋需求']},
 leadership:{audience:['正在培育新任與中階主管的企業','希望改善帶人與協作方式的管理團隊'],situation:'主管知道管理概念，回到現場仍不容易進行回饋、授權或跨部門溝通；培訓與實際工作之間缺少連結。',work:['選定管理層級及最常遇到的帶人情境','設計對話演練、工作任務與主管支持方式','用工作中的行為及回饋檢視學習進展'],prepare:['參與主管層級與人數','希望改善的具體管理情境','課後可安排的實踐與回顧時間']},
 succession:{audience:['需要盤點關鍵職務的人資與經營團隊','希望規劃人才歷練路徑的企業'],situation:'關鍵角色的接替需求存在，卻不清楚下一階段要準備哪些能力；培育名單與實際職務歷練也未連在一起。',work:['確認關鍵職務、未來任務與所需能力','討論準備度、發展意願及需要補足的工作經驗','規劃分階段歷練、支持資源與回顧節點'],prepare:['關鍵職務與預計發展的組織方向','可討論的人才範圍與工作經歷','主管能提供的歷練與支持資源']}
};
const serviceScopeNotes:Record<string,{documents:string;scope:string}>={
 "adoption": {
  "documents": "任務優先清單、資料與使用邊界表、試行與驗收草案。",
  "scope": "需求盤點、試行設計與實際系統建置可分階段討論，不將規劃直接視為已含完整系統交付。"
 },
 "automation": {
  "documents": "流程圖、欄位對照表、防重與例外處理設計、維護交接草案。",
  "scope": "僅在結果可判定且不會重複寫入或寄送時規劃重試；結果未知時先查核，並保留人工處理路徑。"
 },
 "assistant": {
  "documents": "知識來源清冊、回答與轉接規則、提問樣本與回覆檢查表。",
  "scope": "分別釐清內部知識助理與外部客服的使用者、可用資料及回覆範圍；缺少依據時保留人工處理。"
 },
 "data": {
  "documents": "指標定義表、資料品質與來源盤點、看板原型、檢視節奏草案。",
  "scope": "看板需求與原型可先行討論；是否包含正式資料串接、自動更新與維護，需另行確認。"
 },
 "standards": {
  "documents": "關鍵職務與任務清單、職能與行為草案、主管校準討論紀錄。",
  "scope": "可先選優先職務試行，透過企業主管共同校準標準，再討論是否擴及其他職務。"
 },
 "inventory": {
  "documents": "盤點目的與資料規則、討論框架、個人與團隊發展議題清單。",
  "scope": "盤點設計、主管討論引導與後續發展可分階段安排；盤點結果不直接等同任用或升遷結論。"
 },
 "assessment": {
  "documents": "目的與適用範圍表、資料告知與存取安排、結果回饋及發展應用草案。",
  "scope": "工具品牌、授權範圍、施作及解讀條件確認前，不列為已具備或固定提供的工具；工具使用費與服務範圍另議。"
 },
 "leadership": {
  "documents": "主管情境盤點、練習與工作任務、實踐及回饋安排草案。",
  "scope": "本方向聚焦日常管理行為與工作實踐；職涯期待與發展對話，可連結職涯領導力方向一起規劃。"
 },
 "succession": {
  "documents": "關鍵職務清單、準備度討論架構、歷練及階段回顧草案。",
  "scope": "本方向聚焦關鍵職務與人才梯隊；世代期待、經營角色與管理團隊交接，可另參考二代接班協作方向。"
 }
};
function makeService(parent:string,en:string,topic:string,item:typeof aiServices[number],extra:typeof aiExtras[string]):ContentDetail{return{parent,slug:item.id,title:item.title,en,intro:item.description,kind:'service',label:'服務規劃說明',audience:extra.audience,topic,prepare:extra.prepare,sections:[{title:'你可能正在面對的情境',paragraphs:[extra.situation,serviceScopeNotes[item.id].scope]},{title:'可以一起討論的工作範圍',bullets:extra.work},{title:'從討論走向具體成果',paragraphs:['依需求範圍，可討論以下工作文件或安排；實際交付項目、時程與費用以雙方確認的服務方案為準。',serviceScopeNotes[item.id].documents],bullets:[...item.points,'階段回顧與下一步行動建議']}],faq:[{question:'需要一次導入完整方案嗎？',answer:'可先選擇一個範圍明確的議題交流，再討論適合的階段與投入方式。具體服務內容需依企業現況確認。'},{question:'如何判斷是否有進展？',answer:'在開始前先對齊觀察項目、資料來源與回顧方式，再用工作中的證據檢查改變；不預先承諾固定的成果數字。'}]};}
const serviceDetails=[...aiServices.map(s=>makeService('ai-transformation','AI TRANSFORMATION','AI 數位轉型',s,aiExtras[s.id])),...talentServices.map(s=>makeService('talent-development','TALENT ASSET DEVELOPMENT','人才資產發展',s,talentExtras[s.id]))];
const coursePlans=[
 {slug:'ai-productivity',goals:['把工作任務描述為可清楚討論的 AI 協作需求','練習整理、比對與檢查 AI 產出','建立適合自己工作的應用清單'],modules:['任務盤點：找出值得練習的高頻工作','需求表達：補足目標、資料、限制與輸出格式','情境實作：整理內容、形成草稿與人工查核','帶回工作：建立可重複使用的任務說明'],practice:'以不含機密的工作素材，完成一份 AI 任務說明與結果檢查表。'},
 {slug:'workflow-automation',goals:['拆解現有流程的觸發、步驟與例外','辨識適合自動化與需要人判斷的工作','規劃一個可討論的流程試行方案'],modules:['畫出現況：人、資料與工具如何互動','找出重複點：輸入、比對、通知與追蹤','規劃流程：資料欄位、判斷與異常處理','試行準備：驗證條件與維護責任'],practice:'以一個簡化流程，完成現況圖、改善構想及例外情境清單。'},
 {slug:'manager-communication',goals:['釐清主管在不同情境中的溝通目的','練習具體回饋、工作授權與確認理解','規劃一項可在工作中實踐的帶人行動'],modules:['管理情境：分辨問題、期待與責任','回饋練習：用具體行為取代籠統評價','授權對話：對齊目標、資源與檢視節點','行動回顧：設計工作中的練習與回饋'],practice:'透過角色演練，完成一份回饋或授權對話準備單。'},
 {slug:'leadership-coaching',goals:['連結主管的團隊目標與人才培育責任','練習以提問釐清發展需求','為團隊成員規劃具體的發展支持'],modules:['角色定位：主管如何支持團隊成長','理解差異：以工作證據、職涯期待與多元路徑展開發展對話','培育安排：學習、任務與歷練的連結','追蹤支持：確認資源與階段回顧'],practice:'以工作情境練習發展對話，完成一份培育行動草案與主管支持清單。'},
 {slug:'team-collaboration',goals:['辨識跨部門問題中的目標與角色差異','練習整理事實、假設與待釐清事項','建立共同的問題定義與行動安排'],modules:['看見差異：各部門的期待與限制','問題釐清：把現象轉為可討論的議題','共同設計：角色分工與資訊交接','行動追蹤：決議、責任與回顧節奏'],practice:'以模擬情境完成一份跨部門問題釐清與協作行動表。'},
 {slug:'talent-review',goals:['理解人才盤點前需要對齊的目的與標準','練習使用工作證據討論人才發展','將盤點討論轉為後續行動'],modules:['盤點前置：目的、對象與資料使用','證據整理：觀察行為與避免印象推論','討論演練：對齊標準與發展需求','行動連結：培育安排與回顧節點'],practice:'使用去識別化模擬資料，練習完成一份人才發展討論紀錄與後續行動草案。'}
];
const coursePracticeNotes:Record<string,string[]>={
 "ai-productivity": [
  "可採示範、分組實作與回顧，使用學員自己的非機密任務。實際工具不預設品牌或付費帳號。",
  "學員基礎、帳號與設備準備方式於課前確認。"
 ],
 "workflow-automation": [
  "可採流程共作與情境推演；本方向的課內練習以流程設計為主，不等於完成正式系統串接。",
  "若需 n8n 上機建置，另行確認學員基礎、環境與支援範圍。"
 ],
 "manager-communication": [
  "可採角色演練、同儕回饋與行動回顧，聚焦回饋與授權。",
  "案例依新任或中階主管調整；課後實踐與主管回顧是否納入，依需求確認。"
 ],
 "leadership-coaching": [
  "以職涯領導力連結員工發展意願、工作證據與主管支持，可採提問演練及工作任務設計。",
  "本方向為管理與人才培育學習，不代表取得教練證照。"
 ],
 "team-collaboration": [
  "可採跨角色分組、共同畫圖與回顧，使用模擬或經確認可分享的情境。",
  "課內形成的共識是工作實踐起點，不直接代表組織問題已解決。"
 ],
 "talent-review": [
  "可採主管校準討論與案例演練，使用去識別化模擬資料。",
  "真實盤點會議需另案規劃；課內練習不直接作為任用評定。"
 ]
};
const courseDetails:ContentDetail[]=coursePlans.map((plan,i)=>{const direction=academyDirections[i];return{parent:'academy',slug:plan.slug,title:direction.title,en:'CORPORATE LEARNING',intro:direction.description,kind:'course',label:'企業內訓方向規劃',audience:[direction.audience],topic:'企業內訓',prepare:['學員角色、經驗與預計人數','希望改善的工作情境與學習目標','預計期間、形式與可安排時數'],sections:[{title:'可討論的學習目標',bullets:plan.goals},{title:'建議課程模組',paragraphs:['以下為課程規劃初稿，可依學員基礎與企業情境調整。'],bullets:plan.modules},{title:'工作情境練習',paragraphs:[plan.practice,...coursePracticeNotes[plan.slug],'練習可依學員情境調整，使用的素材需先確認可分享範圍。']},{title:'課程安排方式',paragraphs:['課程時數、形式、講師、日期與費用尚未定案，依需求交流後確認。本頁為企業內訓規劃方向，不代表已公告的公開班。']}],faq:[{question:'可以調整模組與案例嗎？',answer:'可依學員基礎、工作場景及預期改變討論調整。課綱與使用素材需在課前確認。'},{question:'看完規劃頁就可以報名嗎？',answer:'目前沒有已公告的開班日期或報名名額，可先透過洽詢頁提出內訓需求；實際收件狀態以表單顯示為準，送出不代表完成報名。'}]};});
export const articleDetails:ContentDetail[]=[
 {parent:'knowledge',slug:'start-with-one-workflow',title:'AI 導入前，先把一個工作流程說清楚',en:'AI & WORK',intro:'從具體任務、資料與檢查方式開始，讓導入討論更容易落地。',kind:'article',label:'主題文章・內容初稿',audience:['準備導入 AI 的主管','流程負責人與營運團隊'],topic:'AI 數位轉型',prepare:['選一個你最想改善的工作流程','試著寫下觸發、輸入、步驟、輸出與檢查方式'],sections:[
 {title:'先描述工作，不急著替工具命名',paragraphs:['「我們想導入 AI」是一個方向，卻還不是可以執行的需求。若能說明誰在什麼時候，拿著哪些資料，需要完成什麼工作，接下來的討論就會更具體。','例如「每週要整理多份回報，再製作主管摘要」可以拆成資料收集、格式整理、重點判讀、摘要撰寫與確認。這是假設情境，目的是練習拆解工作，不代表已發生的客戶案例。']},
 {title:'用五個問題整理現況',bullets:['什麼事件會啟動這項工作？','資料從哪裡來，是否能被使用？','哪些步驟固定，哪些需要判斷？','完成後要交給誰，以什麼格式呈現？','誰負責檢查，怎樣才算可以使用？'],paragraphs:['試著用一句話寫下：當＿＿發生時，由＿＿使用＿＿資料，完成＿＿，交由＿＿確認；若資料不足或結果無法確認，就轉由＿＿處理。']},
 {title:'先約定比較方式，再開始試行',paragraphs:['試行前可以先記錄現況，例如處理步驟、反覆修改的原因與需要人工確認的項目。試行後用同樣的方式回顧，才能看出改變發生在哪裡。','速度只是其中一項觀察。資料是否正確、工作是否更容易交接，以及例外情境是否有人接手，也應一併討論。']},
 {title:'把第一次試行當成學習起點',paragraphs:['先選一個範圍可控的任務，保留人工確認，再整理過程中發現的資料與流程問題。當團隊知道什麼有效、什麼需要調整，才更容易決定下一步。']}
 ],related:[{href:'/ai-transformation/adoption',title:'AI 導入規劃'},{href:'/ai-transformation/automation',title:'n8n 與流程自動化'}]},
 {parent:'knowledge',slug:'evidence-based-talent-conversation',title:'人才盤點之後，如何展開一場有方向的發展對話？',en:'PEOPLE & DEVELOPMENT',intro:'把工作證據、員工發展意願與主管支持放在一起，讓盤點結果連結下一步行動。',kind:'article',label:'主題文章・內容初稿',audience:['人資夥伴','帶人主管與人才發展負責人'],topic:'人才資產發展',prepare:['整理一段可具體描述的工作表現','寫下想釐清的發展需求與可提供的支持'],sections:[
 {title:'從工作證據開始，而不是從評語開始',paragraphs:['「他很有潛力」或「溝通需要加強」都還太抽象。若能回到具體任務、發生的行為與工作影響，對話就比較容易被理解，也比較容易形成共識。','對話前可以先區分觀察到的事實、自己的解讀，以及還需要詢問對方的部分。這有助於避免把尚未確認的想法當成結論。']},
 {title:'讓雙方都能說明自己的理解',bullets:['先說明對話的目的與討論範圍','分享具體情境，邀請對方補充脈絡','詢問對方想發展的能力與工作期待','確認哪些事情需要資源、練習或主管支持'],paragraphs:['發展不只有升遷，也可以是專業深化、跨部門合作或承擔新任務。先聽見員工想走的方向，再一起確認組織能提供的歷練與支持。']},
 {title:'把發展目標連結到一個工作任務',paragraphs:['發展行動可以是一個新任務、一次協作、一段練習或一場學習。關鍵是讓雙方清楚：想練習什麼、何時可以試、由誰提供支持，以及什麼時候再回顧。','評量工具能提供部分參考，但不應取代工作中的觀察與對話。是否使用工具，仍需先確認目的、授權、資料範圍與回饋方式。']},
 {title:'用回顧讓發展持續發生',paragraphs:['回顧可以從「做了什麼、學到什麼、卡在哪裡、需要什麼支持」開始。當發展安排有具體任務與檢視節點，人才盤點就比較容易連結到持續的培育。']}
 ],related:[{href:'/talent-development/inventory',title:'人才盤點與發展對話'},{href:'/talent-development/leadership',title:'領導力與管理能力'}]},
 {parent:'knowledge',slug:'training-needs-brief',title:'企業內訓需求，如何從「想上一堂課」說得更具體？',en:'LEARNING & PRACTICE',intro:'先說清楚對象、工作情境與期待改變，再討論課程主題、形式與課後支持。',kind:'article',label:'主題文章・內容初稿',audience:['企業培訓負責人','人資與部門主管'],topic:'企業內訓',prepare:['學員對象與人數','兩個具體工作情境','課後希望看見的一項行動'],sections:[
 {title:'課名相同，學習需求可能很不同',paragraphs:['同樣是溝通課，新任主管可能需要練習回饋與授權；跨部門團隊則可能需要釐清資訊交接與共同問題。先說明工作情境，才能判斷課程應把時間放在哪裡。']},
 {title:'用四個欄位完成需求摘要',bullets:['學習對象：角色、經驗、參與人數與目前基礎','工作情境：最近反覆遇到的問題或任務','期待改變：課後希望更能完成的行為','安排條件：可用時間、形式、素材與預算範圍']},
 {title:'把學習活動連到實際工作',paragraphs:['課程可以透過對話演練、案例討論或情境練習，讓學員把概念用一次。若能事先選定可分享的素材，也更容易讓課程內容貼近工作。','練習成果不必很大，一份對話準備單、流程圖或行動草案，都可以成為回到工作後繼續討論的起點。實際安排仍需依課程目標與時數確認。']},
 {title:'為課後留下一個回顧節點',paragraphs:['除了課後感受，也可以討論學員在工作中試了什麼、遇到什麼困難，以及主管如何提供支持。先約定回顧方式，讓課程更容易與團隊的日常節奏連在一起。','我們希望讓＿＿角色，在＿＿情境中，更能完成＿＿行動；可安排的時間與形式是＿＿，課後由＿＿支持與回顧。']}
 ],related:[{href:'/academy#internal',title:'六個企業內訓方向'},{href:'/academy/manager-communication',title:'主管溝通與團隊帶領'},{href:'/academy/team-collaboration',title:'跨部門協作與問題解決'}]}
];
export const detailPages:ContentDetail[]=[...serviceDetails,...extendedServiceDetails,...courseDetails,...articleDetails,...partnershipDetails,...caseGuideDetails];
export function findDetail(parent:string,slug:string){return detailPages.find(p=>p.parent===parent&&p.slug===slug);}
export function detailsFor(parent:string){return detailPages.filter(p=>p.parent===parent);}
