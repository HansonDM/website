export const webChat={
 url:'https://hansondm.app.n8n.cloud/webhook/hanson-website-webchat-v1',
 bot:'hansondm-line-191nfqkp',corpusVersion:'fb77deb43ebe44295217b59efabcd7fe52de18692fdfd0067ee6fb5697005c57',version:'2026-10-28-webchat-v1',noticeUrl:'/privacy/#webchat',
 maxLength:2000,historyTurnLimit:12,historyCharacterLimit:12000,
} as const;
// Explicitly approved public snapshots keep chat available during the Pages/n8n rollout.
// This list is fixed at build time; it never trusts a corpus supplied by a visitor.
export const acceptedKnowledgeCorpora:readonly string[]=[webChat.corpusVersion,'e68956cebc046454b245100e473c0d55e3104f505d9eecd87436ccab1bf4d0d2','6a0d270413d9d9e1ba8e752b569092c13e406265b33c1b24269fe5574d86a0fc','198009b6ab68e4f628ebc697d7fadc184948b3af096b8fb9061b26ad06d34974','749d980c0ecc8e674ccc760883964bf6e70555aea9e86e599ea9e0d18156be1c','214205bfaf4bd4175645f08dd54b6ef208172854f6e5a5cb21104d40ecfd8f64','1e492a28a488006fc877417cd8f71861730188afab057ad44ffae3cd6e75a036','729bf99d81ff0905353aa14d49fc219d1fb30bc7538c1dbc6eb7dc688ebb50af','36048cc3e8302765324a86b2f2542bef2c64a3b2becccdec01043c1ac5bad85d','949ddfbea582947c7e6d44ff749ed8f0759ead0a1d635ad108bba8b68ff79310','6a5c68ecc34324e99ce17d2aaa4e9ed62fbccbce1b726a9ca7d0b2a3be8a5ffd','0be4275882a94e077a1c42cc285f35d86535346153e0d95a7dd2053714b21bf1','fb713c56a995fcaf974b7e656df6306d9f8d7b91a0ee13d0dd3dcbc7787d91c7','6b74e5c5a60042cdf9d70b2ec8b5cb7314c33b3a5d072dd7cd5c7fc25822d76f','de7dc3f66169f61c4634067a7b6724203fee8a243a6819e5571e63f6463379eb'];
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
