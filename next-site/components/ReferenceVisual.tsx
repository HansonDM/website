/** Approved homepage photo regions, exported once as compact WebP assets. */
export default function ReferenceVisual({x,y,width,height,className='',fit,align='center'}:{x:number;y:number;width:number;height:number;className?:string;fit?:'cover';align?:'center'|'top'}){
 const photo=x===754&&y===90?{src:'/images/home-people.webp',width:782,height:390,alt:'企業人才與數位應用的商務情境示意'}:x===480&&y===585?{src:'/images/home-ai.webp',width:276,height:286,alt:'透過電腦操作 AI 與數位工具的情境示意'}:x===1220&&y===585?{src:'/images/home-talent.webp',width:260,height:286,alt:'團隊交流與人才發展的情境示意'}:null;
 if(!photo)return null;
 const hero=className.includes('people-visual');
 return <div className={`reference-visual exported-photo ${className}`} style={{aspectRatio:`${width}/${height}`}}><img {...photo} loading={hero?'eager':'lazy'} fetchPriority={hero?'high':undefined} decoding="async" style={{objectFit:fit??'cover',objectPosition:align==='top'?'center top':'center'}}/></div>;
}
