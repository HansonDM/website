'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {intakeEndpoint} from '@/lib/intake-endpoint';
import {intakeAvailability} from '@/lib/intake-availability';
import {intakeCapability,clearIntakeCapability} from '@/lib/intake-capability-cache';
export default function useIntakeAvailability(){
 const[availability,setAvailability]=useState(()=>intakeAvailability(null));
 const[checking,setChecking]=useState(true),[checked,setChecked]=useState(false);
 const sequence=useRef(0),active=useRef<AbortController|null>(null);
 const recheck=useCallback(async(fresh=true)=>{
  if(active.current)return;
  const generation=++sequence.current,controller=new AbortController();active.current=controller;
  setChecking(true);setAvailability(current=>({...current,ready:false}));
  try{
   const endpoint=intakeEndpoint();if(!endpoint)throw Error('No intake status endpoint');
   const next=await intakeCapability(endpoint.status,{signal:controller.signal,fresh});
   if(generation===sequence.current)setAvailability(next);
  }catch{if(generation===sequence.current)setAvailability(current=>({...current,ready:false,attachmentsEnabled:false,visitorNotifications:false}));}
  finally{if(generation===sequence.current){active.current=null;setChecking(false);setChecked(true);}}
 },[]);
 const invalidate=useCallback(()=>{clearIntakeCapability();++sequence.current;active.current?.abort();active.current=null;setAvailability(current=>({...current,ready:false}));setChecking(false);setChecked(true);},[]);
 useEffect(()=>{void recheck(false);return()=>{++sequence.current;active.current?.abort();active.current=null;};},[recheck]);
 return{...availability,checking,checked,recheck,invalidate};
}
