export type InquirySource='team'|'community';
export function inquiryHref(topic:string,interest='',from?:InquirySource){
 const params=new URLSearchParams({topic});if(interest)params.set('interest',interest);if(from==='team'||from==='community')params.set('from',from);
 return'/contact?'+params.toString()+'#inquiry';
}
