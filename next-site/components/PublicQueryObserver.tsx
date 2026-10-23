'use client';
import {Suspense,useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
type Props={field:'focus'|'category'|'theme'|'model';onChange:(value:string|undefined)=>void};
function QueryBridge({field,onChange}:Props){
 const params=useSearchParams(),values=params.getAll(field),value=values.length===1?values[0]:undefined;
 useEffect(()=>onChange(value),[value,onChange]);return null;
}
/** Only URL restoration may suspend; public content stays in the initial HTML. */
export default function PublicQueryObserver(props:Props){return <Suspense fallback={null}><QueryBridge {...props}/></Suspense>;}
