import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Loader2, MessageCircle, Send, X } from 'lucide-react'
import './ChatBot.css'

export const CHAT_URL = 'https://hansondm.app.n8n.cloud/webhook/bd42b249-6f0f-4f5d-bb7f-232b591bba16/chat'
const welcome = '您好！我是企業解憂助手。\n可以和我聊企業管理、職涯發展，或查詢企業解憂事務所 Podcast。'

function sessionKey() {
  try {
    const saved = localStorage.getItem('chatbot_session_id')
    if (/^[A-Za-z0-9_.:-]{8,160}$/.test(saved || '')) return saved
    const fresh = crypto.randomUUID()
    localStorage.setItem('chatbot_session_id', fresh)
    return fresh
  } catch {
    return crypto.randomUUID()
  }
}

// React text nodes keep model-generated text escaped; only http(s) links are interactive.
function replyContent(text) {
  return text.split(/(\[[^\]\n]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<>]+|\*\*[^*\n]+\*\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/)
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
    if (/^\*\*.+\*\*$/.test(part)) return <strong key={index}>{part.slice(2, -2)}</strong>
    return part
  })
}

function messageContent(text) {
  const lines = text.split('\n')
  const blocks = []
  const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*```/.test(lines[index])) {
      const code = []
      const start = index
      while (++index < lines.length && !/^\s*```/.test(lines[index])) code.push(lines[index])
      blocks.push(<pre className="webchat__code" key={`code-${start}`}><code>{code.join('\n')}</code></pre>)
      continue
    }
    const headings = cells(lines[index])
    const separator = lines[index + 1] && cells(lines[index + 1])
    if (headings.length > 1 && separator?.length === headings.length && separator.every((cell) => /^:?-{3,}:?$/.test(cell))) {
      const start = index
      const records = []
      index += 2
      while (index < lines.length && lines[index].includes('|')) {
        const values = cells(lines[index])
        if (values.length !== headings.length) break
        records.push(values)
        index += 1
      }
      index -= 1
      blocks.push(<div className="webchat__records" key={`table-${start}`}>{records.map((values, row) => <dl className="webchat__record" key={row}>{headings.map((heading, column) => <div key={column}><dt>{replyContent(heading)}</dt><dd>{replyContent(values[column])}</dd></div>)}</dl>)}</div>)
      continue
    }
    const heading = lines[index].match(/^#{1,6}\s+(.+)$/)
    blocks.push(<span key={`line-${index}`}>{heading ? <strong>{replyContent(heading[1])}</strong> : replyContent(lines[index])}{index < lines.length - 1 ? '\n' : ''}</span>)
  }
  return blocks
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: welcome }])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pending, setPending] = useState(null)
  const [notice, setNotice] = useState('')
  const [sessionId] = useState(sessionKey)
  const inFlight = useRef(false)
  const closeRef = useRef(null)
  const launcherRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (isOpen) closeRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, isLoading, isOpen])

  const close = () => {
    setIsOpen(false)
    launcherRef.current?.focus()
  }

  async function requestReply(request) {
    if (inFlight.current) return
    inFlight.current = true
    setIsLoading(true)
    setNotice('')
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 120000)
    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error('Chat response unavailable')
      const data = await response.json()
      if (data.pending) {
        setNotice('回覆仍在處理，請稍後按「查詢回覆」，不用重複輸入。')
        return
      }
      if (data.failed) {
        setPending(null)
        setNotice('這筆訊息未完成處理，請重新輸入您的問題。')
        return
      }
      const content = data.text || data.output
      if (typeof content !== 'string' || !content.trim()) throw new Error('Empty reply')
      setMessages((previous) => [...previous, { role: 'assistant', content }])
      setPending(null)
    } catch {
      setNotice('連線中斷，尚未確認回覆結果。請按「查詢回覆」，不要重複輸入同一筆訊息。')
    } finally {
      clearTimeout(timer)
      inFlight.current = false
      setIsLoading(false)
    }
  }

  function submit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || text.length > 12000 || inFlight.current || pending) return
    const request = { action: 'sendMessage', sessionId, chatInput: text, requestId: crypto.randomUUID() }
    setMessages((previous) => [...previous, { role: 'user', content: text }])
    setDraft('')
    setPending(request)
    void requestReply(request)
  }

  return (
    <div className="webchat">
      {isOpen && (
        <section id="webchat-panel" className="webchat__panel" role="dialog" aria-modal="false" aria-labelledby="webchat-title" onKeyDown={(event) => { if (event.key === 'Escape') close() }}>
          <header className="webchat__header">
            <div><h2 id="webchat-title">企業解憂助手</h2><p>管理問題・職涯建議・Podcast</p></div>
            <button ref={closeRef} className="webchat__icon-button" type="button" onClick={close} aria-label="關閉聊天"><X size={21} /></button>
          </header>
          <div ref={listRef} className="webchat__messages" role="log" aria-label="聊天紀錄" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => <div key={index} className={`webchat__message webchat__message--${message.role}`}>{message.role === 'assistant' ? messageContent(message.content) : message.content}</div>)}
            {isLoading && <div className="webchat__waiting" role="status"><Loader2 size={17} className="webchat__spinner" />正在準備回覆…</div>}
          </div>
          {notice && <div className="webchat__notice" role="status">{notice}{pending && !isLoading && <button type="button" onClick={() => { void requestReply(pending) }}>查詢回覆</button>}</div>}
          <form className="webchat__form" onSubmit={submit}>
            <label className="webchat__sr-only" htmlFor="webchat-question">輸入您的問題</label>
            <textarea id="webchat-question" rows={2} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={12000} disabled={isLoading || !!pending} placeholder="輸入您的問題…" onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form.requestSubmit() } }} />
            <button type="submit" disabled={!draft.trim() || isLoading || !!pending} aria-label="傳送訊息"><Send size={19} /></button>
          </form>
          <a className="webchat__standalone" href={CHAT_URL} target="_blank" rel="noopener noreferrer">另開完整聊天視窗 <ExternalLink size={12} /></a>
        </section>
      )}
      <button ref={launcherRef} type="button" className="webchat__launcher" aria-label={isOpen ? '關閉企業解憂助手' : '開啟企業解憂助手'} aria-expanded={isOpen} aria-controls={isOpen ? 'webchat-panel' : undefined} onClick={() => { if (isOpen) close(); else setIsOpen(true) }}>
        {isOpen ? <X size={21} aria-hidden="true" /> : <MessageCircle size={21} aria-hidden="true" />}<span>企業解憂助手</span>
      </button>
    </div>
  )
}
