// Recipient budget uses only an email hash, under the existing global intake lock.
function visitorBudget(ctx,rows,now){
 const key='ack-recipient:'+require('crypto').createHash('sha256').update(ctx.input.email.trim().toLowerCase()).digest('hex'),day=new Date(now+8*3600000).toISOString().slice(0,10),base={...ctx,budgetKey:key,visitorAllowed:false,suppressedReason:'budget_unverified'};
 const found=rows.filter(r=>Object.keys(r||{}).length);if(found.length>1||found.length===1&&(found[0].submissionId!==key||found[0].status!=='ack_budget'||found[0].owner!=='visitor-ack-budget'||!/^\d{4}-\d{2}-\d{2}:\d+$/.test(found[0].fingerprint)||!/^\d+$/.test(found[0].rowId)))return base;
 const prior=found[0],count=prior?.fingerprint.startsWith(day+':')?Number(prior.fingerprint.split(':')[1]):0,last=prior?Number(prior.rowId):0;
 if(!Number.isSafeInteger(count)||count<0||!Number.isSafeInteger(last)||last>now)return base;
 if(last&&now-last<60000)return {...base,suppressedReason:'recipient_cooldown'};
 if(count>=5)return {...base,suppressedReason:'recipient_daily_limit'};
 return {...base,visitorAllowed:true,suppressedReason:'',budgetFingerprint:day+':'+(count+1),budgetTimestamp:String(now)};
}
function visitorBudgetVerified(ctx,rows){const ok=ctx.visitorAllowed&&rows.length===1&&rows[0].submissionId===ctx.budgetKey&&rows[0].fingerprint===ctx.budgetFingerprint&&rows[0].rowId===ctx.budgetTimestamp&&rows[0].status==='ack_budget'&&rows[0].owner==='visitor-ack-budget';return {...ctx,visitorAllowed:!!ok,suppressedReason:ok?'':'budget_unverified'};}
module.exports={visitorBudget,visitorBudgetVerified};
