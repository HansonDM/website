/** Short, public topic codes. Personal data and arbitrary return URLs never belong here. */
export const inquiryTopicCodes:Record<string,string>={ai:'AI 數位轉型',talent:'人才資產發展',training:'企業內訓',public:'公開班',partner:'策略合作'};
export function inquiryTopicCode(topic:string){return Object.keys(inquiryTopicCodes).find(code=>inquiryTopicCodes[code]===topic);}
