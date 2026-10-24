'use client';

import {useEffect, useId, useRef, useState} from 'react';

export default function TemplateCopy({title, text}: {title: string; text: string}) {
  const [ready, setReady] = useState(false), [note, setNote] = useState(''), [manual, setManual] = useState(false);
  const id = useId(), root = useRef<HTMLDivElement>(null), epoch = useRef(0), mounted = useRef(false);
  const currentText = useRef(text); currentText.current = text;

  useEffect(() => {
    mounted.current = true; setReady(true);
    const reset = () => { epoch.current++; setNote(''); setManual(false); };
    const details = root.current?.closest('details');
    const toggle = () => { if (details && !details.open) reset(); };
    window.addEventListener('hashchange', reset); window.addEventListener('popstate', reset);
    details?.addEventListener('toggle', toggle);
    return () => { mounted.current = false; epoch.current++; window.removeEventListener('hashchange', reset); window.removeEventListener('popstate', reset); details?.removeEventListener('toggle', toggle); };
  }, []);

  async function copy() {
    const generation = ++epoch.current, source = window.location.href;
    const valid = () => mounted.current && generation === epoch.current && source === window.location.href && text === currentText.current;
    setNote(''); setManual(false);
    try {
      await navigator.clipboard.writeText(text);
      if (valid()) setNote('聯絡範本已複製。請自行填寫必要資訊並寄出；目前尚未寄信。');
    } catch {
      if (valid()) { setManual(true); setNote('瀏覽器未允許直接複製，請選取下方範本文字手動複製。'); }
    }
  }

  return <div ref={root} className="template-copy">
    <button type="button" className="receipt-action" disabled={!ready} onClick={copy}>複製{title}範本</button>
    <p className="notice" role="status" aria-live="polite">{note}</p>
    {manual && <label htmlFor={id}>手動複製：{title}<textarea id={id} rows={8} readOnly value={text} onFocus={event => event.currentTarget.select()}/></label>}
  </div>;
}
