/** Display a region of the approved composition without changing the source image. */
export default function ReferenceVisual({x,y,width,height,className=''}:{x:number;y:number;width:number;height:number;className?:string}){
 return <div aria-hidden="true" className={`reference-visual ${className}`} style={{aspectRatio:`${width}/${height}`}}><img src="/reference/approved-homepage.png" alt="" width={1536} height={1024} style={{width:`${1536/width*100}%`,left:`${-x/width*100}%`,top:`${-y/height*100}%`}}/></div>;
}
