// Public build data only. Never serialize process.env or a local filesystem path.
const ORIGIN='https://www.hansondm.com';
const INTAKE='https://hansondm.app.n8n.cloud/webhook/hanson-website-intake-v3';
function buildRelease({env={},now=new Date(),sitemapUrls,noindexUrls,consentVersion}){
 const commit=/^[a-f0-9]{40}$/.test(env.GITHUB_SHA||'')?env.GITHUB_SHA:null;
 const runId=/^[1-9][0-9]{0,19}$/.test(env.GITHUB_RUN_ID||'')?env.GITHUB_RUN_ID:null;
 if(env.GITHUB_ACTIONS==='true'&&(!commit||!runId))throw Error('Missing public CI revision');
 for(const value of [...sitemapUrls,...noindexUrls]){const u=new URL(value);if(u.origin!==ORIGIN||u.search||u.hash||!u.pathname.endsWith('/'))throw Error('Invalid public document URL');}
 return {schemaVersion:1,sourceCommit:commit,runId,builtAt:now.toISOString(),siteOrigin:ORIGIN,intakeStatusUrl:INTAKE,consentVersion,sitemapUrls,noindexUrls};
}
module.exports={ORIGIN,INTAKE,buildRelease};
