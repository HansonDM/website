export type ServiceItem = {id:string;title:string;description:string;points:string[]};
export const aiServices: ServiceItem[] = [
 {id:'adoption',title:'AI 導入規劃',description:'先選一個工作流程，釐清任務、資料與人工確認點，再規劃可驗證的 AI 試行。',points:['盤點部門任務與可用資料','釐清導入目標與使用邊界','規劃小範圍試行與驗收方式']},
 {id:'automation',title:'n8n 與流程自動化',description:'串連表單、業務資料與通知，讓流程可追蹤、異常有人接手。',points:['梳理流程節點與負責角色','規劃跨系統資料串接','設計異常通知、結果查核與人工接手']},
 {id:'assistant',title:'AI 客服與知識助理',description:'以企業可使用的知識為基礎，規劃有來源、知道何時轉接人工的 AI 客服與知識助理。',points:['整理常見問題與知識來源','設計回覆範圍與轉接條件','規劃知識更新及回覆品質檢查']},
 {id:'data',title:'數據應用與營運洞察',description:'從經營問題出發，對齊指標、資料與檢視節奏，讓報表支持實際決策。',points:['確認重要指標與資料品質','整合日常營運資訊','設計管理看板與例行檢視流程']}
];
export const talentServices: ServiceItem[] = [
 {id:'standards',title:'人才標準與職能梳理',description:'從策略與關鍵任務出發，把人才期待整理成主管能觀察、能討論的職能與行為。',points:['連結策略、職務與關鍵任務','定義能力及具體行為','建立主管可使用的觀察依據']},
 {id:'inventory',title:'人才盤點與發展對話',description:'結合工作證據、發展意願與職務需求，讓人才盤點形成可以追蹤的培育行動。',points:['規劃盤點對象與評估流程','對齊主管的判斷標準','形成個人與團隊發展議題']},
 {id:'assessment',title:'企業員工評量工具',description:'依人才發展目的，討論企業員工評量工具的選用、結果回饋與工作情境應用。',points:['先確認工具用途與授權','說明資料使用方式與結果邊界','連結發展對話，避免單一結果決策']},
 {id:'leadership',title:'領導力與管理能力',description:'從回饋、授權與協作等帶人情境出發，讓管理學習連結工作中的練習與回顧。',points:['辨識不同管理層級的課題','設計情境練習與工作任務','結合課後實踐與主管回饋']},
 {id:'succession',title:'接班梯隊與關鍵人才',description:'盤點關鍵職務與未來任務，規劃人才歷練、支持資源與準備度回顧。',points:['盤點關鍵職位及接班需求','設計階段培育與歷練安排','追蹤準備度與發展進展']}
];
export const academyDirections=[
 {slug:'ai-productivity',title:'AI 應用與工作效率',category:'AI 與數位',description:'從日常任務練習 AI 需求表達、內容整理與查核，完成可帶回工作的任務說明。',audience:'一般同仁、部門主管'},
 {slug:'workflow-automation',title:'流程優化與自動化',category:'AI 與數位',description:'拆解工作流程、辨識自動化機會與人工判斷點，形成一份可討論的試行方案。',audience:'流程負責人、營運團隊'},
 {slug:'manager-communication',title:'主管溝通與團隊帶領',category:'領導與管理',description:'以具體帶人情境，練習回饋、授權與確認理解，帶回一項可實踐的管理行動。',audience:'新任主管、中階主管'},
 {slug:'leadership-coaching',title:'領導力與人才培育',category:'領導與管理',description:'從員工的發展意願與工作證據出發，練習發展對話，規劃主管能提供的培育支持。',audience:'中高階主管、人資團隊'},
 {slug:'team-collaboration',title:'跨部門協作與問題解決',category:'組織與協作',description:'把跨部門的不同期待轉為共同問題，練習事實釐清、角色分工與行動追蹤。',audience:'跨部門團隊、專案成員'},
 {slug:'talent-review',title:'人才盤點與發展實務',category:'組織與協作',description:'對齊人才盤點目的與標準，使用工作證據練習討論，將結果連結到發展行動。',audience:'人資夥伴、用人主管'}
];
export const faqs=[
 {category:'AI 數位轉型',question:'企業想導入 AI，第一步應該準備什麼？',answer:'先整理一個希望改善的工作流程：目前誰在做、使用哪些資料、花費時間，以及希望改善的結果。需求交流可從這些具體情境開始，不必先選定工具。',href:'/ai-transformation'},
 {category:'AI 數位轉型',question:'還沒有整理好的企業知識，也能開始規劃嗎？',answer:'可以先盤點資料的位置、負責人與可使用範圍，再挑選一個範圍清楚的主題。知識整理、更新責任與回覆驗證，都應納入導入規劃。',href:'/ai-transformation#assistant'},
 {category:'人才資產發展',question:'人才盤點與企業員工評量工具有什麼關係？',answer:'人才盤點是綜合工作證據與組織需求的討論流程；評量工具可以提供部分參考資訊。工具的使用需先確認目的、授權與資料使用方式，不以單一結果取代管理判斷。',href:'/talent-development#assessment'},
 {category:'人才資產發展',question:'如何開始規劃主管培育？',answer:'先釐清主管層級、日常管理課題與預期改變，再討論適合的情境練習、課後任務與檢視方式。可在洽詢時提供對象、人數及目前遇到的問題。',href:'/talent-development#leadership'},
 {category:'企業學院',question:'企業內訓可以客製化嗎？',answer:'可以先透過需求交流，討論學員對象、工作情境、學習目標與可安排的時間，再規劃課程內容、活動方式與後續實踐。具體安排依需求確認。',href:'/academy#custom'},
 {category:'企業學院',question:'公開班何時開課？如何報名？',answer:'目前尚無開放課程。課程公告後將提供內容、對象、時間及參與方式；可在企業學院依欄位受理狀態，另行訂閱課程通知。完成信箱驗證後才生效，每封通知可退訂；訂閱不等於報名、候補或保留名額。',href:'/academy#public'},
 {category:'合作與洽詢',question:'想提出講師或策略合作，需要提供什麼？',answer:'請提供專業領域、服務對象、合作類型、提案摘要與聯絡方式。合作內容與對外資訊需經雙方確認後才會公開。',href:'/partnerships#proposal'},
 {category:'合作與洽詢',question:'送出需求就代表已完成預約嗎？',answer:'提出需求不代表完成預約。實際收件狀態以表單顯示為準，後續仍需確認需求範圍與雙方時間。',href:'/contact'},
 {category:'AI 數位轉型',question:'流程自動化需要先更換所有系統嗎？',answer:'先確認既有工具、資料流向與可串接條件，再討論適合的改進範圍。是否調整系統取決於工作需求與現有條件，並非一開始就要全面更換。',href:'/ai-transformation/automation'},
 {category:'AI 數位轉型',question:'AI 客服可以回答所有問題嗎？',answer:'應先界定可使用的知識、更新責任與回覆範圍，並設計需要確認或轉由人員處理的情況。規劃時會討論如何檢查來源與回覆內容。',href:'/ai-transformation/assistant'},
 {category:'人才資產發展',question:'企業員工評量結果會如何使用？',answer:'使用目的、授權、可見對象與回饋方式需事先確認。結果應與工作觀察及發展對話一起理解，不以單一結果取代管理判斷。',href:'/talent-development/assessment'},
 {category:'企業學院',question:'內訓方向頁上的模組就是正式課綱嗎？',answer:'目前呈現的是課程規劃初稿。正式課綱、時數、講師、日期與費用，需依學員基礎及企業需求確認；本頁不代表已公告公開班。',href:'/academy'},
 {category:'合作與洽詢',question:'洽詢前需要提供預算嗎？',answer:'若已有預算範圍，可一併提供，協助討論合適的階段與服務安排。尚未確定時，也可以先整理目標、範圍、對象與時間限制。',href:'/contact'},
 {category:'合作與洽詢',question:'合作資訊會直接公開在網站上嗎？',answer:'不會直接公開。夥伴名稱、Logo、介紹、聯合課程與活動資訊，都需先經雙方確認；目前網站未展示尚未確認的合作內容。',href:'/partnerships'}
 ,{category:'人才資產發展',question:'職涯領導力如何連結企業的人才發展？',answer:'從員工的角色與發展意願、主管可以提供的支持，以及組織未來需要的能力一起討論，再形成學習、任務歷練與回顧安排。',href:'/talent-development/career-leadership'},
 {category:'人才資產發展',question:'雇主品牌與員工價值主張需要哪些依據？',answer:'先整理企業實際提供的工作、學習與職涯支持，對照員工經驗與可核對的資料，再形成對內與對外的溝通內容。尚未落實的安排需標示為規劃。',href:'/talent-development/employer-brand-evp'},
 {category:'人才資產發展',question:'如何整理員工職涯發展投入的社會影響？',answer:'先釐清支持對象、投入與行動，再討論員工及相關對象的改變、觀察項目與資料來源。呈現影響時一併說明證據與限制，不預設固定金額或認證結果。',href:'/talent-development/social-impact'},
 {category:'人才資產發展',question:'二代接班可以由哪些顧問專業一起支援？',answer:'可依課題組合企業診斷、跨部門溝通、人才發展、流程與專案管理等專業，討論世代期待、角色調整、經驗傳承及接班行動。團隊安排依需求確認。',href:'/talent-development/family-succession'}
];
export const partnershipTypes=[
 {id:'alliance',title:'策略聯盟',description:'顧問公司、企業服務商、AI 技術與人資科技夥伴，依各自專長討論共同服務與解決方案。'},
 {id:'cross-industry',title:'跨界合作與企業交流',description:'從互補資源與服務對象出發，討論主題活動、企業交流及商機合作的可能。'},
 {id:'education',title:'產學與協會合作',description:'連結學校、產業協會與企業需求，討論學習活動、專題交流與人才發展議題。'},
 {id:'instructors',title:'講師與專業顧問合作',description:'歡迎具 AI 應用、組織發展、人才與管理專長的夥伴，提出課程或專案合作構想。'}
];
