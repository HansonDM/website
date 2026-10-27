// Read-only checks. No credentials, customer records, POSTs, mail or external writes.
const assert=require('node:assert/strict');
const {ORIGIN,INTAKE}=require('./release-status.cjs');
const SUBSCRIPTION='https://hansondm.app.n8n.cloud/webhook/hanson-website-participation-v1/catalogue',BOOKING='https://hansondm.app.n8n.cloud/webhook/hanson-website-booking-v1/catalogue';
const RETRY_DELAYS_MS=Object.freeze([5000,10000,20000,30000,45000]);
function publicUrl(value){const u=new URL(value);assert.equal(u.origin,ORIGIN);assert(!u.username&&!u.password&&!u.hash&&!u.search);assert(/^\/(?:[a-z0-9-]+\/)*$/.test(u.pathname));return u.href;}
function checkRelease(r,expected){
 assert.equal(r.schemaVersion,1);assert.equal(r.siteOrigin,ORIGIN);assert.equal(r.intakeStatusUrl,INTAKE);
 assert.equal(r.sourceCommit,expected.commit);assert.equal(r.runId,expected.runId);
 assert(/^[a-f0-9]{40}$/.test(r.sourceCommit));assert(/^[1-9][0-9]{0,19}$/.test(r.runId));
 assert(Number.isFinite(Date.parse(r.builtAt)));assert.equal(r.consentVersion,'2026-10-24-v3');
 assert(Array.isArray(r.sitemapUrls)&&r.sitemapUrls.length===39);assert.equal(new Set(r.sitemapUrls).size,39);
 assert(Array.isArray(r.noindexUrls)&&r.noindexUrls.length===4);assert.equal(new Set(r.noindexUrls).size,4);
 r.sitemapUrls.forEach(publicUrl);r.noindexUrls.forEach(publicUrl);
 assert(r.noindexUrls.includes(ORIGIN+'/privacy/'));assert(r.noindexUrls.every(url=>!r.sitemapUrls.includes(url)));
}
function checkIntake(s){
 assert.equal(s.ready,true);assert.equal(s.destination,'smartsheet');assert.equal(s.consentVersion,'2026-10-24-v3');
 assert.equal(s.privacyNoticeUrl,ORIGIN+'/privacy/');assert.equal(s.notifications?.owner,true);assert.equal(s.notifications?.visitor,true);
 assert.equal(s.attachments?.enabled,true);assert.equal(s.attachments.maxFiles,3);assert.equal(s.attachments.maxTotalBytes,5*1024*1024);
 assert.deepEqual([...s.attachments.types].sort(),['application/pdf','image/jpeg','image/png']);
}
function checkSubscription(s){
 assert.equal(s.version,'2026-10-25-participation-v1','Subscription notice version changed');
 assert.equal(s.subscriptionEnabled,true,'Course subscription is not enabled');
 assert.equal(s.noticePublished,true,'Subscription notice is not published');
 assert.equal(s.noticeUrl,'/privacy/#participation');assert.equal(s.timezone,'Asia/Taipei');
 assert.equal(typeof s.bookingEnabled,'boolean');assert.equal(typeof s.enrollmentEnabled,'boolean');
 assert(Array.isArray(s.courses)&&s.courses.length<=100,'Invalid public course catalogue');
 assert.notEqual(s.mode,'local-validation','Synthetic subscription catalogue in production');
}
function checkBooking(s){
 assert.equal(s.version,'2026-10-27-booking-v1','Booking notice version changed');
 assert.equal(s.enabled,true,'Online booking is not enabled');assert.equal(s.noticePublished,true,'Booking notice is not published');
 assert.equal(s.noticeUrl,'/privacy/#appointments');assert.equal(s.timezone,'Asia/Taipei');assert.equal(s.cancelHours,24);
 assert(Array.isArray(s.slots)&&s.slots.length<=200,'Invalid public booking catalogue');
 const ids=new Set();for(const slot of s.slots){assert(slot&&typeof slot.id==='string'&&/^booking-[a-z0-9]+$/.test(slot.id),'Invalid booking slot');assert(!ids.has(slot.id),'Duplicate booking slot');ids.add(slot.id);for(const v of[slot.start,slot.end])assert(typeof v==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v)&&Number.isFinite(Date.parse(v)),'Invalid booking time');assert.equal(Date.parse(slot.end)-Date.parse(slot.start),30*60000,'Booking duration changed');}
 // A fully busy calendar is valid: an empty slot list must not fail deployment.
}
function checkSitemap(xml,r){const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.deepEqual([...urls].sort(),[...r.sitemapUrls].sort());}
function checkNoindex(html,url,r){
 const meta=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]).find(s=>/name=["']robots["']/i.test(s));
 assert(meta&&/content=["'][^"']*\bnoindex\b/i.test(meta),'Missing noindex: '+url);
 if(url===ORIGIN+'/privacy/'){assert(/content=["'][^"']*\bnofollow\b/i.test(meta));assert(html.includes(r.consentVersion));}
}
async function runHealth({expected,fetchImpl=fetch,probe=1}){
 assert(/^[a-f0-9]{40}$/.test(expected.commit));assert(/^[1-9][0-9]{0,19}$/.test(expected.runId));
 assert(Number.isInteger(probe)&&probe>=1&&probe<=RETRY_DELAYS_MS.length+1);
 const read=async(url)=>{assert([INTAKE,SUBSCRIPTION,BOOKING].includes(url)||url.startsWith(ORIGIN+'/'));const u=new URL(url);u.searchParams.set('release',expected.commit);u.searchParams.set('run',expected.runId);if(url===ORIGIN+'/release-status.json')u.searchParams.set('probe',String(probe));const response=await fetchImpl(u.href,{method:'GET',redirect:'error',credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(8000)});assert.equal(response.status,200,'Public GET failed: '+url);const text=await response.text();assert(text.length<2_000_000,'Oversized public response');return text;};
 const r=JSON.parse(await read(ORIGIN+'/release-status.json'));checkRelease(r,expected);
 const [status,subscription,booking,xml,...pages]=await Promise.all([read(INTAKE),read(SUBSCRIPTION),read(BOOKING),read(ORIGIN+'/sitemap.xml'),...r.noindexUrls.map(read)]);
 checkIntake(JSON.parse(status));checkSubscription(JSON.parse(subscription));const bookingState=JSON.parse(booking);checkBooking(bookingState);checkSitemap(xml,r);pages.forEach((html,i)=>checkNoindex(html,r.noindexUrls[i],r));
 return {status:'passed',checkedAt:new Date().toISOString(),sourceCommit:r.sourceCommit,runId:r.runId,publicGetCount:9,formPosts:0,subscriptionEnabled:true,bookingEnabled:true,bookingSlotCount:bookingState.slots.length,intakeReady:true,ownerMailEnabled:true,visitorMailEnabled:true,attachmentsEnabled:true,sitemapUrls:r.sitemapUrls.length,noindexPages:pages.length};
}
async function runHealthWithRetry({expected,fetchImpl=fetch,sleepImpl=ms=>new Promise(resolve=>setTimeout(resolve,ms)),onRetry=()=>{}}){
 // Pages can report success before every CDN edge serves the new run metadata.
 // Keep exact SHA/run checks; only public reads are retried, at most six times.
 for(let attempt=1;attempt<=RETRY_DELAYS_MS.length+1;attempt++){
  try{return {...await runHealth({expected,fetchImpl,probe:attempt}),attempts:attempt};}
  catch(error){if(attempt>RETRY_DELAYS_MS.length)throw error;const delayMs=RETRY_DELAYS_MS[attempt-1];onRetry({attempt,delayMs,error});await sleepImpl(delayMs);}
 }
}
if(require.main===module){
 const commit=process.env.EXPECTED_COMMIT,runId=process.env.EXPECTED_RUN_ID;
 runHealthWithRetry({expected:{commit,runId},onRetry:({attempt,delayMs,error})=>console.error('Read-only health attempt '+attempt+'/6 failed: '+error.message+'; retrying in '+delayMs/1000+'s.')}).then(result=>console.log(JSON.stringify(result))).catch(error=>{console.error('Read-only health verification failed: '+error.message);process.exitCode=1;});
}
module.exports={SUBSCRIPTION,BOOKING,RETRY_DELAYS_MS,checkSubscription,checkBooking,publicUrl,checkRelease,checkIntake,checkSitemap,checkNoindex,runHealth,runHealthWithRetry};
