export const sheetName='韓森網站｜表單收件與追蹤';
export const targetWorkspaceUrl='https://app.smartsheet.com/browse/workspaces/7HpRx85FWqXMwPg43m97W2cHR44QvW3qXRQFmvh1';
export const columns=[
 {key:'submissionId',title:'送出編號',type:'TEXT_NUMBER',primary:true},
 {key:'formType',title:'表單類型',type:'TEXT_NUMBER'},
 {key:'topic',title:'洽詢主題',type:'TEXT_NUMBER'},
 {key:'interest',title:'關注服務或課程',type:'TEXT_NUMBER'},
 {key:'name',title:'聯絡姓名',type:'TEXT_NUMBER'},
 {key:'company',title:'公司組織',type:'TEXT_NUMBER'},
 {key:'email',title:'電子郵件',type:'TEXT_NUMBER'},
 {key:'phone',title:'聯絡電話',type:'TEXT_NUMBER'},
 {key:'message',title:'需求或提案內容',type:'TEXT_NUMBER'},
 {key:'audience',title:'學員對象與人數',type:'TEXT_NUMBER'},
 {key:'preferredPeriod',title:'期待安排期間',type:'TEXT_NUMBER'},
 {key:'format',title:'學習形式',type:'TEXT_NUMBER'},
 {key:'expertise',title:'專業領域',type:'TEXT_NUMBER'},
 {key:'cooperationType',title:'合作類型',type:'TEXT_NUMBER'},
 {key:'consent',title:'資料使用同意',type:'CHECKBOX'},
 {key:'consentVersion',title:'同意告知版本',type:'TEXT_NUMBER'},
 {key:'sourcePath',title:'來源頁面',type:'TEXT_NUMBER'},
 {key:'submittedAt',title:'送出時間',type:'TEXT_NUMBER'},
 {key:'status',title:'處理狀態',type:'TEXT_NUMBER'},
 {key:'owner',title:'負責窗口',type:'TEXT_NUMBER'},
 {key:'followUpDate',title:'下次追蹤日',type:'DATE'},
 {key:'notes',title:'內部備註',type:'TEXT_NUMBER'}
] as const;
export const intakeColumns=columns.filter(c=>!['owner','followUpDate','notes'].includes(c.key));
