import {privacyNotice} from './privacy-notice';

/** Public, blank examples only. Never merge form inputs, receipt storage or URL parameters. */
const definitions = [
  {
    id: 'receipt', title: '收件核對',
    description: '送出狀態待確認，或已收到網頁回執但找不到確認信時，可先提供編號讓窗口核對。',
    subject: '韓森網站洽詢｜請協助核對收件',
    body: '您好，我想請窗口協助核對先前的網站洽詢。\n\n送出編號：[填寫網頁回執或確認信中的編號；若未保存請註明]\n大約送出日期：[如記得，可填寫]\n需要協助的事項：[例如送出狀態待確認，或未收到確認信]\n\n請回覆此來信信箱，協助確認後續處理方式。謝謝。',
  },
  {
    id: 'correction', title: '補充與更正',
    description: '已送出需求後補充資訊或更正內容，使用原編號聯繫，不必再提交同一筆需求。',
    subject: '韓森網站洽詢｜補充或更正先前需求',
    body: '您好，我想補充或更正先前的網站洽詢。\n\n送出編號：[如有，請填寫]\n要處理的事項：[補充資訊／更正資料]\n需要補充或更正的範圍：[先簡述必要部分，不需貼上完整原表單]\n\n若需要補充附件，請先告知適合的提供方式；本次不重新寄送全部附件。\n請回覆此來信信箱，協助核對後續處理。謝謝。',
  },
  {
    id: 'rights', title: '資料權利',
    description: '依既有資料使用告知，準備查詢、閱覽、複製、補充更正、停止蒐集處理利用或刪除的聯絡內容。',
    subject: '韓森網站｜資料權利申請聯繫',
    body: '您好，我想就先前提供的網站洽詢資料提出申請。\n\n申請事項：[保留需要的項目：查詢／閱覽／取得複製本／補充或更正／停止蒐集、處理、利用／刪除]\n資料範圍：[先簡述，例如某筆洽詢及相關附件]\n送出編號：[如有，請填寫；若未保存請註明]\n其他需要說明的事項：[如有，請簡述]\n\n請回覆此來信信箱，告知後續核對及處理方式。謝謝。',
  },
] as const;

export const followUpTemplates = definitions.map(item => ({
  ...item,
  downloadHref: `/resources/hanson-follow-up-${item.id}.txt`,
  copyText: `收件者：${privacyNotice.contact}\n主旨：${item.subject}\n\n${item.body}`,
  mailto: `mailto:${privacyNotice.contact}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.body)}`,
}));

export const followUpSearchText = '收件後聯絡範本 郵件草稿 下載範本 '+definitions.map(item => item.title+' '+item.description).join(' ');
