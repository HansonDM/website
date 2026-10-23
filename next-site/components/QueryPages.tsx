'use client';
import type {CasePreviewEntry} from '@/lib/case-preview-model';
import {useSearchParams} from 'next/navigation';
import {AcademyPage,ContactPage,KnowledgePage} from './InteriorPages';
import {resolveInquiryContext} from '@/lib/inquiry-context';
import {parseComparison} from '@/lib/academy-planning';
import {cleanSearchQuery,searchKind} from '@/lib/site-search';
export default function QueryPages({kind,entries=[]}:{kind:'academy'|'contact'|'knowledge';entries?:CasePreviewEntry[]}){
 const params=useSearchParams();const get=(name:string)=>{const values=params.getAll(name);return values.length===1?values[0]:undefined;};
 if(kind==='academy')return <AcademyPage comparison={parseComparison(get('compare'))}/>;
 if(kind==='knowledge')return <KnowledgePage query={cleanSearchQuery(get('q'))} kind={searchKind(get('type'))} entries={entries}/>;
 const context=resolveInquiryContext(get('topic'),get('interest'),get('from'),get('compare'),get('planning'),get('focus'));
 return <ContactPage topic={context.topic} interest={context.interest} from={context.from} comparison={context.comparison.join(',')} planning={context.planning} focus={context.focus.join(',')}/>;
}
