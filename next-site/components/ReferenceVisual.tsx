/** Display a region of the approved composition without changing the source image. */
export default function ReferenceVisual({x,y,width,height,className='',fit,align='center'}:{x:number;y:number;width:number;height:number;className?:string;fit?:'cover';align?:'center'|'top'}){
 // An SVG viewport clips the source region before fitting it into a responsive box.
 // Percentage img offsets otherwise drift when the box and source ratios differ.
 if(fit==='cover')return <div aria-hidden="true" className={`reference-visual ${className}`} style={{aspectRatio:`${width}/${height}`}}><svg viewBox={`${x} ${y} ${width} ${height}`} preserveAspectRatio={`xMid${align==='top'?'YMin':'YMid'} slice`} focusable="false" style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'hidden'}}><image href="/reference/approved-homepage.png" x={0} y={0} width={1536} height={1024}/></svg></div>;
 return <div aria-hidden="true" className={`reference-visual ${className}`} style={{aspectRatio:`${width}/${height}`}}><img src="/reference/approved-homepage.png" alt="" width={1536} height={1024} style={{width:`${1536/width*100}%`,left:`${-x/width*100}%`,top:`${-y/height*100}%`}}/></div>;
}
