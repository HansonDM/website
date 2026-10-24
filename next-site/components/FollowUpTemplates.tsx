import {followUpTemplates} from '@/lib/follow-up-templates';
import {privacyNotice} from '@/lib/privacy-notice';
import TemplateCopy from './TemplateCopy';

export default function FollowUpTemplates({rightsOnly = false}: {rightsOnly?: boolean}) {
  const templates = rightsOnly ? followUpTemplates.filter(item => item.id === 'rights') : followUpTemplates;
  const id = rightsOnly ? 'rights-help' : 'follow-up-templates';
  return <section id={id} className="interior-section follow-up-templates" aria-labelledby={id+'-title'}>
    <div className="interior-section-heading"><p className="eyebrow">CONTACT THE HANDLING TEAM</p><h2 id={id+'-title'}>{rightsOnly ? '準備資料權利申請的聯絡內容' : '收件後聯絡，從這裡開始。'}</h2><p>選擇適合的範本，在自己的郵件中補上必要資訊，再寄給處理窗口。</p></div>
    <ol className="follow-up-steps"><li>找到原送出編號；未保存時可先註明。</li><li>只簡述需要協助的事項，不需重新寄送完整原表單或全部附件。</li><li>寄至 <a href={'mailto:'+privacyNotice.contact}>{privacyNotice.contact}</a>，由窗口核對後辦理。</li></ol>
    <div className="follow-up-list">{templates.map(item => <details key={item.id} id={'follow-up-'+item.id} className="follow-up-card">
      <summary><span>{item.title}</span><span aria-hidden="true">＋</span></summary>
      <div className="follow-up-content"><p>{item.description}</p><pre className="follow-up-example">{item.copyText}</pre>
        <div className="follow-up-actions"><a className="receipt-action" href={item.mailto} target="_blank" rel="noopener noreferrer">開啟{item.title}郵件草稿 ↗</a><a className="receipt-action" href={item.downloadHref} download>下載{item.title}範本</a></div>
        <TemplateCopy title={item.title} text={item.copyText}/>
      </div>
    </details>)}</div>
    <aside className="content-note">這些是空白聯絡範本，需自行修改並寄出；開啟草稿、複製或下載都不代表已寄信、已受理或完成資料處理。範本不會自動帶入本頁表單、附件或收件編號。請勿在首次來信附上身分證件、密碼或不必要的第三人資料；資料權利申請仍由窗口核對身分後依法辦理。</aside>
    <noscript><p className="notice">未啟用網站腳本仍可閱讀、開啟郵件草稿及下載範本；複製按鈕需啟用腳本。</p></noscript>
  </section>;
}
