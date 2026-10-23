'use client';
import {Suspense,createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import {useSearchParams} from 'next/navigation';
import {knowledgeQueryString} from '@/lib/knowledge-query';
import {knowledgeNavigationEvent} from '@/lib/knowledge-navigation';

const KnowledgeQuery=createContext({query:'',ready:false});
// Suspend only the URL observer, keeping the actual public content in the HTML.
function QueryBridge({onChange}:{onChange:(query:string)=>void}){
 const params=useSearchParams(),query=knowledgeQueryString(params.toString());
 useEffect(()=>onChange(query),[query,onChange]);return null;
}
export default function KnowledgeQueryProvider({initialQuery='',children}:{initialQuery?:string;children:ReactNode}){
 const[query,setQuery]=useState(()=>knowledgeQueryString(initialQuery)),[ready,setReady]=useState(false);
 const applyQuery=useCallback((next:string)=>{setQuery(knowledgeQueryString(typeof window==='undefined'?next:window.location.search));setReady(true);},[]);
 useEffect(()=>{const restore=()=>applyQuery(window.location.search);restore();window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);window.addEventListener(knowledgeNavigationEvent,restore);return()=>{window.removeEventListener('popstate',restore);window.removeEventListener('hashchange',restore);window.removeEventListener(knowledgeNavigationEvent,restore);};},[applyQuery]);
 const value=useMemo(()=>({query,ready}),[query,ready]);
 return <KnowledgeQuery.Provider value={value}>{children}<Suspense fallback={null}><QueryBridge onChange={applyQuery}/></Suspense></KnowledgeQuery.Provider>;
}
export function useKnowledgeQuery(){const{query}=useContext(KnowledgeQuery);return useMemo(()=>new URLSearchParams(query),[query]);}

export function useKnowledgeReady(){return useContext(KnowledgeQuery).ready;}
