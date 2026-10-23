'use client';
import {useSearchParams} from 'next/navigation';
import {ContactPage} from './InteriorPages';
import {resolveInquiryContext} from '@/lib/inquiry-context';
export default function QueryPages(){
 const params=useSearchParams();const get=(name:string)=>{const values=params.getAll(name);return values.length===1?values[0]:undefined;};
 const context=resolveInquiryContext(get('topic'),get('interest'),get('from'),get('compare'),get('planning'),get('focus'));
 return <ContactPage topic={context.topic} interest={context.interest} from={context.from} comparison={context.comparison.join(',')} planning={context.planning} focus={context.focus.join(',')}/>;
}
