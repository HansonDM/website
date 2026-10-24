export const attachmentLimits={maxFiles:3,maxTotalBytes:5*1024*1024,accept:'.pdf,.png,.jpg,.jpeg',label:'PDF、PNG、JPG；最多 3 個檔案，合計 5 MB'} as const;
export function attachmentSelectionError(files:ReadonlyArray<{name:string;size:number;type:string}>):string{
 if(files.length>attachmentLimits.maxFiles)return '最多可選擇 3 個附件。';
 if(files.some(f=>!Number.isSafeInteger(f.size)||f.size<=0))return '附件不能是空白檔案。';
 if(files.reduce((n,f)=>n+f.size,0)>attachmentLimits.maxTotalBytes)return '附件合計不能超過 5 MB。';
 for(const f of files){const name=f.name.normalize('NFKC').trim(),ext=name.split('.').pop()?.toLowerCase(),mime=ext==='pdf'?'application/pdf':ext==='png'?'image/png':['jpg','jpeg'].includes(ext||'')?'image/jpeg':'';
 if(name.length>180||/^[.]|[\\/\u0000-\u001f\u007f]/.test(name)||!mime||f.type&&f.type!==mime)return '附件限 PDF、PNG 或 JPG，請確認檔名與格式。';}
 return '';
}
export async function encodeAttachments(files:File[]){return Promise.all(files.map(async file=>{const bytes=new Uint8Array(await file.arrayBuffer());let raw='';for(let offset=0;offset<bytes.length;offset+=32768)raw+=String.fromCharCode(...bytes.subarray(offset,offset+32768));return {name:file.name,type:file.type,size:file.size,content:btoa(raw)};}));}
