const fs=require('fs'),crypto=require('crypto'),{build}=require('./n8n-intake-v3-workflow.cjs');
function validation(resources,input){const w=build(resources);w.name='韓森網站｜雙方確認信驗證｜僅管理者手動';for(const name of['查詢表單接收狀態','讀取公開接收狀態','輸出公開接收狀態']){w.nodes=w.nodes.filter(n=>n.name!==name);delete w.connections[name];}
 const source=w.nodes.find(n=>n.name==='接收網站表單');source.type='n8n-nodes-base.code';source.typeVersion=2;delete source.webhookId;source.parameters={mode:'runOnceForAllItems',jsCode:'return [{json:{headers:{origin:"https://www.hansondm.com","content-type":"application/json"},body:'+JSON.stringify(input)+'}}];'};
 const trigger={id:crypto.randomUUID(),name:'管理者手動合成驗證',type:'n8n-nodes-base.manualTrigger',typeVersion:1,parameters:{},position:[-280,0]};w.nodes.unshift(trigger);w.connections[trigger.name]={main:[[{node:source.name,type:'main',index:0}]]};
 w.nodes.find(n=>n.name==='讀取接收設定').parameters.filters.conditions.find(c=>c.keyName==='key').keyValue='validation-v3';const validator=w.nodes.find(n=>n.name==='驗證來源與欄位');validator.parameters.jsCode=validator.parameters.jsCode.replaceAll('r.key==="production-v3"','r.key==="validation-v3"');
 const reply=w.nodes.find(n=>n.name==='回覆網站接收結果');reply.type='n8n-nodes-base.code';reply.typeVersion=2;reply.parameters={mode:'runOnceForAllItems',jsCode:'return $input.all();'};return w;
}
module.exports={validation};
