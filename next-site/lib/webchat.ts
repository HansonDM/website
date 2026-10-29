export const webChat={
 url:'https://hansondm.app.n8n.cloud/webhook/hanson-website-webchat-v1',
 bot:'hansondm-line-191nfqkp',corpusVersion:'fb713c56a995fcaf974b7e656df6306d9f8d7b91a0ee13d0dd3dcbc7787d91c7',version:'2026-10-28-webchat-v1',noticeUrl:'/privacy/#webchat',
 maxLength:2000,historyTurnLimit:12,historyCharacterLimit:12000,
} as const;
// Explicitly approved public snapshots keep chat available during the Pages/n8n rollout.
// This list is fixed at build time; it never trusts a corpus supplied by a visitor.
export const acceptedKnowledgeCorpora:readonly string[]=[webChat.corpusVersion,'6b74e5c5a60042cdf9d70b2ec8b5cb7314c33b3a5d072dd7cd5c7fc25822d76f','de7dc3f66169f61c4634067a7b6724203fee8a243a6819e5571e63f6463379eb'];
export type ChatTurn={id:string;question:string;answer?:string;status:'pending'|'received'|'failed'};
export type ChatHistory={role:'user'|'assistant';content:string}[];
export function chatHistory(turns:readonly ChatTurn[]):ChatHistory{
 const picked:ChatTurn[]=[];let size=0;
 for(const turn of [...turns].reverse()){
  if(turn.status!=='received'||!turn.answer)continue;
  const next=turn.question.length+turn.answer.length;
  if(picked.length>=webChat.historyTurnLimit||size+next>webChat.historyCharacterLimit)break;
  picked.unshift(turn);size+=next;
 }
 return picked.flatMap(t=>[{role:'user' as const,content:t.question},{role:'assistant' as const,content:t.answer!}]);
}
export function chatReady(raw:unknown){
 if(!raw||typeof raw!=='object')return false;const r=raw as Record<string,unknown>;
 return r.ready===true&&typeof r.knowledgeCorpus==='string'&&acceptedKnowledgeCorpora.includes(r.knowledgeCorpus)&&r.bot===webChat.bot&&r.version===webChat.version&&r.maxLength===webChat.maxLength&&r.historyTurnLimit===webChat.historyTurnLimit&&r.historyCharacterLimit===webChat.historyCharacterLimit&&r.noticeUrl==='https://www.hansondm.com'+webChat.noticeUrl&&r.attachmentsEnabled===false;
}
export function chatReply(raw:unknown,id:string){
 if(!raw||typeof raw!=='object')return null;const r=raw as Record<string,unknown>;
 if(r.requestId!==id||typeof r.knowledgeCorpus!=='string'||!acceptedKnowledgeCorpora.includes(r.knowledgeCorpus)||r.bot!==webChat.bot||r.version!==webChat.version||typeof r.output!=='string'||!r.output.trim()||r.output.length>6000)return null;
 return r.output.trim();
}
export function chatLink(raw:string){
 try{const u=new URL(raw);return['http:','https:'].includes(u.protocol)&&!u.username&&!u.password?u.href:null;}catch{return null;}
}
