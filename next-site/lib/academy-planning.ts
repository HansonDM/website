import {detailPages} from './detail-content';
import {academyDirections} from './interior-content';
export const comparisonLimit=3;
export const courseProfiles=academyDirections.map(direction=>{
 const detail=detailPages.find(p=>p.parent==='academy'&&p.slug===direction.slug)!;
 return{...direction,goals:detail.sections.find(s=>s.title==='可討論的學習目標')?.bullets??[],modules:detail.sections.find(s=>s.title==='建議課程模組')?.bullets??[],practice:detail.sections.find(s=>s.title==='工作情境練習')?.paragraphs?.[0]??''};
});
export function parseComparison(value:unknown):string[]{
 if(typeof value!=='string')return[];
 const allowed=new Set(courseProfiles.map(c=>c.slug));
 return [...new Set(value.slice(0,300).split(',').map(s=>s.trim()).filter(s=>allowed.has(s)))].slice(0,comparisonLimit);
}
export function comparisonCourses(slugs:readonly string[]){const ids=parseComparison(slugs.join(','));return ids.map(slug=>courseProfiles.find(c=>c.slug===slug)!);}
export function comparisonInterest(slugs:readonly string[]){return comparisonCourses(slugs).map(c=>c.title).join('／');}
export function comparisonHref(slugs:readonly string[],hash='#compare'){
 const ids=parseComparison(slugs.join(',')),params=new URLSearchParams();if(ids.length)params.set('compare',ids.join(','));
 const anchor=['#internal','#compare','#public','#custom',''].includes(hash)?hash:'#compare';
 return'/academy'+(params.size?'?'+params.toString():'')+anchor;
}
export function comparisonInquiryHref(slugs:readonly string[]){const ids=parseComparison(slugs.join(','));return ids.length?'/contact?'+new URLSearchParams({topic:'企業內訓',compare:ids.join(',')}).toString()+'#inquiry':'/contact?topic='+encodeURIComponent('企業內訓')+'#inquiry';}
export function courseMatches(slug:string,query:string){
 const course=courseProfiles.find(c=>c.slug===slug);if(!course)return false;
 const normalize=(text:string)=>text.normalize('NFKC').toLowerCase().replace(/\s/g,'');
 const body=normalize([course.title,course.description,course.audience,...course.goals,...course.modules,course.practice].join(' '));
 return query.trim().slice(0,120).split(/\s+/).filter(Boolean).every(term=>body.includes(normalize(term)));
}
export function trainingBrief(slugs:readonly string[]){
 const selected=comparisonCourses(slugs);
 return['韓森管理顧問有限公司｜企業內訓需求討論單','企業內訓規劃方向，課綱、講師、時數、日期與費用依需求確認。','這份文件供需求整理使用；下載不代表已送出洽詢、完成報名或保留名額。','',...selected.flatMap((c,i)=>[`${i+1}. ${c.title}`,`適合對象：${c.audience}`,'可討論的學習目標：',...c.goals.map(g=>'・'+g),`工作情境練習：${c.practice}`,'']), '洽詢前可以先整理：','學員對象與人數：','目前的工作情境與挑戰：','課後希望能完成的行動：','期待安排期間與形式：','可投入的時間與其他限制：','','請在正式接收啟用後，透過網站洽詢頁確認接收狀態。'].join('\n');
}
