// Read-only checks. No credentials, customer records, POSTs, mail or external writes.
const assert=require('node:assert/strict');
const {ORIGIN,INTAKE}=require('./release-status.cjs');
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
function checkSitemap(xml,r){const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.deepEqual([...urls].sort(),[...r.sitemapUrls].sort());}
function checkNoindex(html,url,r){
 const meta=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]).find(s=>/name=["']robots["']/i.test(s));
 assert(meta&&/content=["'][^"']*\bnoindex\b/i.test(meta),'Missing noindex: '+url);
 if(url===ORIGIN+'/privacy/'){assert(/content=["'][^"']*\bnofollow\b/i.test(meta));assert(html.includes(r.consentVersion));}
}
async function runHealth({expected,fetchImpl=fetch}){
 assert(/^[a-f0-9]{40}$/.test(expected.commit));assert(/^[1-9][0-9]{0,19}$/.test(expected.runId));
 const read=async(url)=>{assert(url===INTAKE||url.startsWith(ORIGIN+'/'));const u=new URL(url);u.searchParams.set('release',expected.commit);u.searchParams.set('run',expected.runId);const response=await fetchImpl(u.href,{method:'GET',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(8000)});assert.equal(response.status,200,'Public GET failed: '+url);const text=await response.text();assert(text.length<2_000_000,'Oversized public response');return text;};
 const r=JSON.parse(await read(ORIGIN+'/release-status.json'));checkRelease(r,expected);
 const [status,xml,...pages]=await Promise.all([read(INTAKE),read(ORIGIN+'/sitemap.xml'),...r.noindexUrls.map(read)]);
 checkIntake(JSON.parse(status));checkSitemap(xml,r);pages.forEach((html,i)=>checkNoindex(html,r.noindexUrls[i],r));
 return {status:'passed',checkedAt:new Date().toISOString(),sourceCommit:r.sourceCommit,runId:r.runId,publicGetCount:7,formPosts:0,intakeReady:true,ownerMailEnabled:true,visitorMailEnabled:true,attachmentsEnabled:true,sitemapUrls:r.sitemapUrls.length,noindexPages:pages.length};
}
if(require.main===module){
 const commit=process.env.EXPECTED_COMMIT,runId=process.env.EXPECTED_RUN_ID;
 // Bounded retry for Pages propagation; every request is a GET, never a submission retry.
 (async()=>{for(let attempt=1;attempt<=6;attempt++){try{console.log(JSON.stringify(await runHealth({expected:{commit,runId}})));return;}catch(error){console.error('Read-only health attempt '+attempt+' failed: '+error.message);if(attempt===6)throw error;await new Promise(resolve=>setTimeout(resolve,5000));}}})().catch(()=>{process.exitCode=1;});
}
module.exports={publicUrl,checkRelease,checkIntake,checkSitemap,checkNoindex,runHealth};
