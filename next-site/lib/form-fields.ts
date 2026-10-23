export const inquiryTopics=['AI 數位轉型','人才資產發展','企業內訓','公開班','策略合作','其他'] as const;
export const cooperationTypes=['策略聯盟','跨界合作與企業交流','產學與協會合作','講師與專業顧問合作'] as const;
export const learningFormats=['尚未確定','實體課程','線上課程','混合安排'] as const;
export type Submission={submissionId:string;name:string;company:string;email:string;phone:string;topic:string;interest:string;audience:string;preferredPeriod:string;format:string;expertise:string;cooperationType:string;message:string;consent:boolean;sourcePath:string};
export class FormInputError extends Error{}
export function normalizeSubmission(input:unknown):Submission{
 if(!input||typeof input!=='object'||Array.isArray(input))throw new FormInputError('資料格式錯誤。');
 const b=input as Record<string,unknown>;
 const read=(key:string,max:number,required=false)=>{const value=b[key];if(value!==undefined&&typeof value!=='string')throw new FormInputError('欄位格式錯誤。');const text=(value as string|undefined)?.trim()??'';if((required&&!text)||text.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text))throw new FormInputError('請確認必填欄位與內容長度。');return text;};
 if(read('website',200))throw new FormInputError('無法送出此表單。');
 const submissionId=read('submissionId',36,true);if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId))throw new FormInputError('送出編號錯誤，請重新整理表單。');
 const topic=read('topic',40,true);if(!(inquiryTopics as readonly string[]).includes(topic))throw new FormInputError('請選擇洽詢主題。');
 const name=read('name',100,true),company=read('company',200,true),email=read('email',254,true).toLowerCase(),message=read('message',5000,true);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||message.length<10||b.consent!=='on')throw new FormInputError('請確認電子郵件、需求內容與資料使用同意。');
 const sourcePath=read('sourcePath',250,true);if(!/^\/(?!\/)[^?#\s]*$/.test(sourcePath))throw new FormInputError('來源頁面格式錯誤。');
 const partner=topic==='策略合作',course=topic==='企業內訓'||topic==='公開班';
 const expertise=partner?read('expertise',200,true):'',cooperationType=partner?read('cooperationType',50,true):'';
 if(partner&&!(cooperationTypes as readonly string[]).includes(cooperationType))throw new FormInputError('請選擇合作類型。');
 const format=course?read('format',30):'';if(format&&!(learningFormats as readonly string[]).includes(format))throw new FormInputError('學習形式格式錯誤。');
 return{submissionId,name,company,email,message,topic,consent:true,sourcePath,phone:read('phone',30),interest:read('interest',200),audience:course?read('audience',200):'',preferredPeriod:course?read('preferredPeriod',100):'',format,expertise,cooperationType};
}
export const formType=(topic:string)=>topic==='策略合作'?'合作提案':topic==='企業內訓'?'內訓詢價':topic==='公開班'?'公開班需求':'顧問洽詢';
