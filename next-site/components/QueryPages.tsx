'use client';
import {useSearchParams} from 'next/navigation';
import {AcademyPage,ContactPage} from './InteriorPages';
import {resolveInquiryContext} from '@/lib/inquiry-context';
import {parseComparison} from '@/lib/academy-planning';
export default function QueryPages({kind}:{kind:'academy'|'contact'}){
 const params=useSearchParams();const get=(name:string)=>{const values=params.getAll(name);return values.length===1?values[0]:undefined;};
 if(kind==='academy')return <AcademyPage comparison={parseComparison(get('compare'))}/>;
 const context=resolveInquiryContext(get('topic'),get('interest'),get('from'),get('compare'),get('planning'),get('focus'));
 return <ContactPage topic={context.topic} interest={context.interest} from={context.from} comparison={context.comparison.join(',')} planning={context.planning} focus={context.focus.join(',')}/>;
}
