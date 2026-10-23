import {createHash,randomUUID} from 'node:crypto';
import {mkdir,open,readFile,rename} from 'node:fs/promises';
import {resolve,join} from 'node:path';

export type JournalRecord={fingerprint:string;submissionId:string;rowId:string;status:'received'|'pending_verification'};
/** Private durable metadata only: never store form bodies or contact details. */
export function journalPath(directory:string,scope:string){
 return join(resolve(directory),createHash('sha256').update(scope).digest('hex')+'.json');
}
export async function readJournal(path:string):Promise<JournalRecord|null>{
 try{
  const value=JSON.parse(await readFile(path,'utf8'));
  if(!/^[a-f0-9]{64}$/.test(value.fingerprint)||typeof value.submissionId!=='string'||typeof value.rowId!=='string'||!['received','pending_verification'].includes(value.status))throw Error('Invalid journal');
  return value;
 }catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return null;throw error;}
}
async function syncDirectory(directory:string){const handle=await open(directory,'r');try{await handle.sync();}finally{await handle.close();}}
export async function claimJournal(directory:string,path:string,record:JournalRecord){
 await mkdir(resolve(directory),{recursive:true,mode:0o700});
 let handle;try{handle=await open(path,'wx',0o600);}catch(error){if((error as NodeJS.ErrnoException).code==='EEXIST')return false;throw error;}
 // A crash while creating the claim fails closed; it must never permit another POST.
 try{await handle.writeFile(JSON.stringify(record));await handle.sync();}finally{await handle.close();}
 await syncDirectory(resolve(directory));return true;
}
export async function completeJournal(directory:string,path:string,record:JournalRecord){
 const temporary=path+'.'+randomUUID()+'.tmp',handle=await open(temporary,'wx',0o600);
 try{await handle.writeFile(JSON.stringify(record));await handle.sync();}finally{await handle.close();}
 await rename(temporary,path);await syncDirectory(resolve(directory));
}
