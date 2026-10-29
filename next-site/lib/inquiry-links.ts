import {inquiryTopicCode} from './inquiry-codes';
import {detailPages} from './detail-content';
export type InquirySource='team'|'community';
export function inquiryHref(topic:string,interest='',from?:InquirySource){
 const code=inquiryTopicCode(topic),detail=detailPages.find(p=>p.topic===topic&&p.title===interest),params=new URLSearchParams(code?{t:code}:{topic});
 if(detail)params.set('ref',detail.parent+'/'+detail.slug);else if(interest)params.set('interest',interest);if(from==='team'||from==='community')params.set('from',from);
 return'/contact/?'+params.toString()+'#inquiry';
}
