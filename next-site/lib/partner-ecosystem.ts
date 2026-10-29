/** Owner requested these source-backed names. Status distinguishes intent/planning from completed alliances. */
export const partnerEcosystem=[
 {id:'rockyboost',name:'RockyBoost｜樂勤悟實國際有限公司',area:'溝通與主管培育',status:'雙方合作規劃',text:'結合組織課題釐清與溝通領導力培育，討論主管帶領、跨世代協作與工作坊的協作方式。',topics:['主管溝通','領導力工作坊','人才發展'],group:'專業服務與聯盟規劃'},
 {id:'corporate-trainers',name:'企業講師聯誼會',area:'講師社群與教學交流',status:'三方聯盟規劃',text:'連結講師社群、課程共創與企業需求，討論與 RockyBoost 及韓森的專業互補與學習交流。',topics:['講師交流','課程共創','企業學習'],group:'專業服務與聯盟規劃'},
 {id:'for-you',name:'富由產業學院媒合平台',area:'企業診斷與顧問資源媒合',status:'聯盟合作規劃',text:'串聯企業經營課題與顧問專業，討論數位轉型、人才發展及永續議題的協作與學習資源。',topics:['顧問媒合','數位轉型','人才與永續'],group:'專業服務與聯盟規劃'},
 {id:'unity',name:'優樂地永續服務股份有限公司',area:'永續與數位應用',status:'合作意向資料',text:'以永續服務與 AI 應用的專業互補為交流方向，依專案需求討論顧問支援與數位流程。',topics:['永續服務','AI 應用','專業協作'],group:'專業服務與聯盟規劃'},
 {id:'circles',name:'圈圈數位股份有限公司',area:'職涯與員工支持',status:'合作備忘錄框架',text:'圍繞員工關懷、職涯發展、教育資源及組織韌性，整理可共同交流與規劃的服務面向。',topics:['員工關懷','職涯發展','教育資源'],group:'專業服務與聯盟規劃'},
 {id:'haitu',name:'海途教育發展企業社',area:'職涯教育與員工福祉',status:'合作備忘錄框架',text:'現有備忘錄載有香港生涯規劃協會相關合作背景，交流職涯支持、多元族群學習及社會影響力。',topics:['職涯支持','多元學習','社會影響力'],group:'教育與專業交流'},
 {id:'ldi',name:'生涯發展學院 LDI',area:'職涯學習與數位服務',status:'專案交流紀錄',text:'以職涯學習內容與 AI 輔助應用為交流面向，結合知識整理、學習服務與使用回饋。',topics:['職涯學習','AI 知識應用','學習服務'],group:'教育與專業交流'},
 {id:'noah',name:'諾亞未來人才教育學會',area:'人才教育與專業社群',status:'主要顧問專業連結',text:'主要顧問個人簡介載明參與的專業學會連結，關注人才教育、職涯發展與學習交流。',topics:['人才教育','職涯發展','專業交流'],group:'教育與專業交流'},
 {id:'xunyue',name:'旬玥老師｜形象穿搭專業',area:'專業知識與 AI 應用',status:'初步合作交流',text:'從形象穿搭專業出發，交流知識系統化、AI 應用與線上學習內容的合作可能性。',topics:['專業知識整理','AI 應用','學習內容'],group:'跨域交流與個人專業合作'},
 {id:'hui',name:'HUI 輝全人健康',area:'全人健康資源交流',status:'顧問個人業務合作資料',text:'主要顧問個人合作資料所載的資源連結；企業需求仍須由相應專業窗口確認服務內容與適用條件。',topics:['資源連結','員工關懷','專業轉介'],group:'跨域交流與個人專業合作'}
] as const;
export const partnerGroups=[...new Set(partnerEcosystem.map(p=>p.group))];
