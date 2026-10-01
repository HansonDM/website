import { createElement, useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Compass,
  Database,
  HeartHandshake,
  Layers3,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'
import WhatsNew from './components/WhatsNew.jsx'
import heroImage from './assets/organization-intelligence-hero.webp'
import hansonPhoto from './assets/hanson_lin_photo.jpg'
import vincentPhoto from './assets/vincent_wu_photo.jpg'

const CALENDAR_URL = 'https://calendar.app.google/gsmSP4Yu1vvqYxub8'
const LINE_URL = 'https://lin.ee/X8h0cv5'
const EVENT_URL = 'https://event20260606.hansondm.com'

const navigation = [
  { id: 'solutions', label: '解決方案' },
  { id: 'diagnostic', label: '七維戰位' },
  { id: 'methodology', label: 'SDB 方法論' },
  { id: 'team', label: '顧問團隊' },
  { id: 'insights', label: '洞見觀點' },
]

const dimensions = [
  { id: 'D1', title: '策略與組織發展', description: '讓組織方向、優先取捨與人才架構支撐業務策略。', icon: Compass },
  { id: 'D2', title: '績效與團隊管理', description: '建立目標、問責與執行節奏，讓成果可被看見。', icon: Target },
  { id: 'D3', title: '人才發展與培訓', description: '看見人才需求，設計學習、繼任與成長路徑。', icon: UsersRound },
  { id: 'D4', title: '跨部門協作與文化推動', description: '打通協作障礙，讓變革溝通與文化真正發生。', icon: Network },
  { id: 'D5', title: '核心人才作業', description: '優化招募、職位、薪酬與關鍵人資作業。', icon: BriefcaseBusiness },
  { id: 'D6', title: '員工關係與敬業度', description: '建立信任、傾聽與歸屬，穩定關鍵人才。', icon: HeartHandshake },
  { id: 'D7', title: '數據化人才資源管理', description: '用人才數據支持規劃、決策與永續揭露。', icon: Database },
]

const solutionCards = [
  {
    eyebrow: '01 / STRATEGY',
    title: '組織與策略',
    text: '當方向、角色與資源尚未對齊，先把真正影響經營的優先事項看清楚。',
    tags: ['組織設計', '策略對焦', '人力規劃'],
  },
  {
    eyebrow: '02 / TALENT',
    title: '人才與領導',
    text: '從人才盤點到接班與主管帶隊，讓每個關鍵角色發揮應有影響力。',
    tags: ['人才盤點', '接班規劃', '領導力發展'],
  },
  {
    eyebrow: '03 / TRANSFORMATION',
    title: '文化、流程與數位',
    text: '將跨部門協作、流程優化與數據能力串成可持續推進的轉型節奏。',
    tags: ['協作文化', '流程優化', '數位決策'],
  },
]

const journey = [
  { id: '01', title: '盤點現況', text: '看見組織訊號與關鍵戰位。', icon: Search },
  { id: '02', title: '對焦議題', text: '找出影響成效的優先順序。', icon: CircleDot },
  { id: '03', title: '共創方案', text: '設計能被團隊採用的行動。', icon: Lightbulb },
  { id: '04', title: '追蹤落地', text: '建立節奏，讓改變持續發生。', icon: BarChart3 },
]

const sdbSteps = [
  { id: 'SEE', title: '看見戰位', text: '看見人才、角色、協作與數據的真實訊號。' },
  { id: 'DO', title: '落地執行', text: '將優先議題轉為計畫、節奏與管理行動。' },
  { id: 'BECOME', title: '文化內化', text: '讓領導、協作與決策方式成為日常系統。' },
]

function RadarIllustration() {
  return (
    <div className="radar-card" aria-label="七維戰位概念圖，涵蓋七個組織面向">
      <div className="radar-card__topline">
        <span>ORGANIZATION INTELLIGENCE</span>
        <span>七維戰位</span>
      </div>
      <svg viewBox="0 0 200 195" role="img" aria-label="七維戰位概念雷達圖">
        <title>七維戰位概念雷達圖</title>
        <polygon className="radar-grid" points="100,18 164,49 181,119 136,174 64,174 19,119 36,49" />
        <polygon className="radar-grid radar-grid--mid" points="100,45 143,66 154,113 124,148 76,148 46,113 57,66" />
        <polygon className="radar-grid radar-grid--inner" points="100,69 124,81 130,108 115,128 85,128 70,108 76,81" />
        <line className="radar-axis" x1="100" y1="18" x2="100" y2="174" />
        <line className="radar-axis" x1="36" y1="49" x2="164" y2="119" />
        <line className="radar-axis" x1="164" y1="49" x2="36" y2="119" />
        <line className="radar-axis" x1="181" y1="119" x2="64" y2="174" />
        <polygon className="radar-data" points="100,50 138,69 144,112 119,146 73,143 50,113 61,75" />
        {[['100','50'], ['138','69'], ['144','112'], ['119','146'], ['73','143'], ['50','113'], ['61','75']].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="radar-dot" cx={cx} cy={cy} r="3.7" />
        ))}
      </svg>
      <div className="radar-card__legend">
        <span><i className="legend-dot legend-dot--blue" />組織現況</span>
        <span><i className="legend-dot legend-dot--outline" />診斷面向</span>
      </div>
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState(() => {
    const redirected = sessionStorage.getItem('redirectPath')
    if (redirected === 'whatsnew' || window.location.pathname === '/whatsnew') {
      sessionStorage.removeItem('redirectPath')
      return 'whatsnew'
    }
    return 'home'
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPopState = () => setCurrentPage(window.location.pathname === '/whatsnew' ? 'whatsnew' : 'home')
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }

  const navigateToWhatsNew = () => {
    setCurrentPage('whatsnew')
    window.history.pushState({}, '', '/whatsnew')
    window.scrollTo({ top: 0 })
  }

  const navigateToMain = () => {
    setCurrentPage('home')
    window.history.pushState({}, '', '/')
    window.scrollTo({ top: 0 })
  }

  if (currentPage === 'whatsnew') return <WhatsNew onBack={navigateToMain} />

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">跳至主要內容</a>

      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container header-inner">
          <button className="brand-mark" onClick={() => scrollToSection('home')} aria-label="回到韓森管理顧問首頁">
            <span className="brand-mark__icon">H</span>
            <span>
              <strong>韓森管理顧問</strong>
              <small>HANSON MANAGEMENT CONSULTING</small>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="主要導覽">
            {navigation.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}>{item.label}</button>
            ))}
          </nav>

          <a className="header-cta" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
            預約顧問諮詢 <ArrowRight size={16} aria-hidden="true" />
          </a>

          <button className="menu-button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}>
            {isMenuOpen ? <X size={23} /> : <Menu size={25} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mobile-nav" aria-label="手機主要導覽">
            {navigation.map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)}>{item.label}<ChevronRight size={17} /></button>)}
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">預約顧問諮詢 <ArrowRight size={17} /></a>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section id="home" className="hero-section">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">PEOPLE <span>×</span> INSIGHT <span>×</span> ACTION</p>
              <h1>把組織問題，<br /><em>變成可行動的決策</em></h1>
              <p className="hero-intro">以七維戰位看見組織真實狀態，串連人才、文化、流程與數據；韓森協助企業從診斷、優先排序到轉型落地，建立可持續的成長能力。</p>
              <div className="hero-actions">
                <button className="button button--primary" onClick={() => scrollToSection('diagnostic')}>啟動七維戰位診斷 <ArrowRight size={18} /></button>
                <a className="button button--secondary" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">預約顧問諮詢</a>
              </div>
              <div className="hero-anchor-list" aria-label="核心專業">
                <span>組織診斷</span><span>人才策略</span><span>轉型落地</span>
              </div>
            </div>

            <div className="hero-visual">
              <img src={heroImage} alt="企業團隊在現代辦公環境中進行策略協作，象徵人與數據的連結" />
              <div className="hero-image-wash" aria-hidden="true" />
              <RadarIllustration />
              <div className="hero-visual-label" aria-hidden="true">HUMAN<br />INTELLIGENCE<br />IN ACTION</div>
            </div>
          </div>
        </section>

        <section className="credibility-strip" aria-label="韓森管理顧問的服務特點">
          <div className="container credibility-grid">
            <div className="credibility-lead"><strong>人</strong><span>×</span><strong>數據</strong><span>×</span><strong>未來</strong></div>
            <div><UsersRound size={22} /><p><strong>以人為本的組織洞察</strong><br /><span>從真實工作情境看見關鍵訊號。</span></p></div>
            <div><BarChart3 size={22} /><p><strong>資料化的管理視角</strong><br /><span>協助領導者聚焦真正重要的議題。</span></p></div>
            <div><Sparkles size={22} /><p><strong>能夠落地的轉型節奏</strong><br /><span>讓方案成為團隊日常的行動。</span></p></div>
          </div>
        </section>

        <section id="solutions" className="section section--white">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><p className="eyebrow eyebrow--dark">WHERE TO BEGIN</p><h2>從問題出發，<br />找到最適合的解題路徑</h2></div>
              <p>不同階段的企業，面對的從不是單一人資議題。韓森從經營脈絡出發，協助領導團隊建立更清楚的判斷與行動。</p>
            </div>
            <div className="solution-grid">
              {solutionCards.map((card) => (
                <article className="solution-card" key={card.eyebrow}>
                  <p>{card.eyebrow}</p><h3>{card.title}</h3><span className="solution-card__line" /><p className="solution-card__description">{card.text}</p>
                  <ul>{card.tags.map((tag) => <li key={tag}><Check size={15} />{tag}</li>)}</ul>
                  <button onClick={() => scrollToSection('contact')}>探索解題方式 <ArrowRight size={17} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="diagnostic" className="section diagnostic-section">
          <div className="container diagnostic-layout">
            <div className="diagnostic-copy">
              <p className="eyebrow eyebrow--blue">SEVEN-DIMENSION ORGANIZATION INTELLIGENCE</p>
              <h2>七維戰位，<br /><em>全面掌握組織健康度</em></h2>
              <p>以七個彼此關聯的面向盤點組織，從策略到人才、從文化到資料化能力，看見真正影響成效與成長的優先順序。</p>
              <button className="text-link" onClick={() => scrollToSection('contact')}>申請診斷說明 <ArrowRight size={18} /></button>
            </div>
            <div className="dimension-grid">
              {dimensions.map(({ id, title, description, icon }) => {
                return (
                  <article key={id} className="dimension-card">
                    <span className="dimension-card__icon">{createElement(icon, { size: 21 })}</span>
                    <div><small>{id}</small><h3>{title}</h3><p>{description}</p></div>
                    <ArrowRight className="dimension-card__arrow" size={17} aria-hidden="true" />
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section journey-section">
          <div className="container">
            <div className="section-heading journey-heading"><p className="eyebrow eyebrow--dark">FROM INSIGHT TO ACTION</p><h2>從洞察到行動的<br />四步診斷路徑</h2><p>診斷不是一份報告，而是讓團隊理解現況、對焦議題並持續前進的共同語言。</p></div>
            <div className="journey-grid">
              {journey.map(({ id, title, text, icon }, index) => {
                return <article className="journey-step" key={id}><div className="journey-step__number">{id}</div><div className="journey-step__icon">{createElement(icon, { size: 25 })}</div><h3>{title}</h3><p>{text}</p>{index < journey.length - 1 && <ChevronRight className="journey-step__arrow" size={22} aria-hidden="true" />}</article>
              })}
            </div>
            <div className="journey-cta"><span>您將獲得</span><strong>組織健康地圖、優先改善議題與下一步行動建議</strong><button onClick={() => scrollToSection('contact')}>開始一場有準備的對談 <ArrowRight size={17} /></button></div>
          </div>
        </section>

        <section id="methodology" className="section methodology-section">
          <div className="container methodology-layout">
            <div className="methodology-intro"><p className="eyebrow">THE SDB TRANSFORMATION SYSTEM</p><h2>看見，落地，<br /><em>成為組織能力</em></h2><p>七維戰位幫助企業看見現況；SDB 則將洞察轉為一套能被團隊持續實踐的轉化系統。</p></div>
            <div className="sdb-list">{sdbSteps.map((step, index) => <article key={step.id} className="sdb-step"><div><span>0{index + 1}</span><h3>{step.id}</h3></div><div><h4>{step.title}</h4><p>{step.text}</p></div><ChevronRight size={23} aria-hidden="true" /></article>)}</div>
          </div>
        </section>

        <section id="team" className="section section--white team-section">
          <div className="container">
            <div className="section-heading section-heading--center"><p className="eyebrow eyebrow--dark">THE PEOPLE BEHIND THE METHOD</p><h2>顧問，是方法的解讀者</h2><p>不同產業與不同階段的問題，需要能連結經營現場、人與組織系統的專業陪伴。</p></div>
            <div className="team-grid">
              <article className="team-card"><img src={hansonPhoto} alt="Hanson Lin 林明輝" /><div className="team-card__content"><p>企業架構與數位轉型</p><h3>Hanson Lin<br /><span>林明輝</span></h3><p className="team-card__description">資深企業架構師與數位轉型顧問，專注於以管理系統與數位能力回應企業成長挑戰。</p><span className="team-card__tag">組織策略 · 數位轉型 · 專案管理</span></div></article>
              <article className="team-card"><img src={vincentPhoto} alt="Vincent C. L. Wu 吳志倫" /><div className="team-card__content"><p>人才發展與品牌策略</p><h3>Vincent C. L. Wu<br /><span>吳志倫</span></h3><p className="team-card__description">橫跨三洲的國際品牌戰略顧問與蓋洛普優勢認證教練，擅長連結人才、顧客與成長策略。</p><span className="team-card__tag">人才發展 · 品牌管理 · 顧客體驗</span></div></article>
            </div>
          </div>
        </section>

        <section id="insights" className="section insights-section">
          <div className="container insights-layout">
            <div><p className="eyebrow eyebrow--blue">INSIGHT &amp; PRACTICE</p><h2>讓洞見，<br />成為下一步行動</h2><p>從組織與人才議題的觀點文章，到可參與的工作坊與活動，持續累積團隊可用的管理語言。</p><button className="text-link" onClick={navigateToWhatsNew}>閱讀最新觀點 <ArrowRight size={18} /></button></div>
            <div className="insight-cards">
              <button className="insight-card" onClick={navigateToWhatsNew}><span>INSIGHT</span><h3>從「努力導向」走向「配置導向」</h3><p>重新理解人才戰位，讓管理資源投入在最能創造影響力的地方。</p><ArrowRight size={18} /></button>
              <a className="insight-card insight-card--accent" href={EVENT_URL} target="_blank" rel="noopener noreferrer"><span>WORKSHOP</span><h3>SEE · DO · BECOME<br />企業職能三部曲</h3><p>以實作與對話，探索組織與人才升級的起點。</p><ArrowRight size={18} /></a>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-layout">
            <div className="contact-copy"><p className="eyebrow">LET'S START WITH THE RIGHT QUESTION</p><h2>先釐清問題，<br /><em>再決定下一步</em></h2><p>預約一場 30 分鐘的組織診斷對談，與顧問一起理解您現在面臨的挑戰，找到合適的起點。</p><div className="contact-methods"><a href={`mailto:hanson.lin@hansondm.com`}><Mail size={18} />hanson.lin@hansondm.com</a><a href="tel:+886982899889"><Phone size={18} />+886-982-899889</a><a href={LINE_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />加入 LINE 官方帳號</a></div></div>
            <div className="contact-panel"><div className="contact-panel__badge"><CalendarDays size={19} />30 分鐘組織診斷對談</div><h3>開始一場有準備的對談</h3><p>您可以直接選擇合適時段，或透過線上表單留下您的需求。</p><a className="button button--primary button--wide" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">查看可預約時段 <ArrowRight size={18} /></a><div className="contact-panel__divider"><span>或</span></div><a className="button button--secondary button--wide" href="https://docs.google.com/forms/d/e/1FAIpQLSdZUb_CSKZjUrRQ9wfs39jX6qc8FBcddWyAvt_23cG7d-zIOw/viewform" target="_blank" rel="noopener noreferrer">填寫線上諮詢表單</a><p className="contact-panel__privacy"><ShieldCheck size={14} />資料僅用於回覆您的諮詢需求。</p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid"><div><div className="footer-brand">H</div><h2>韓森管理顧問</h2><p>以人 × 數據 × 未來，打造更具韌性的企業組織。</p></div><div><h3>探索韓森</h3>{navigation.slice(0, 4).map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)}>{item.label}</button>)}</div><div><h3>保持聯繫</h3><a href={`mailto:hanson.lin@hansondm.com`}>hanson.lin@hansondm.com</a><a href="tel:+886982899889">+886-982-899889</a><a href={LINE_URL} target="_blank" rel="noopener noreferrer">LINE 官方帳號</a></div></div>
        <div className="container footer-bottom"><span>© 2026 韓森管理顧問有限公司</span><span>People × Insight × Action</span></div>
      </footer>

      <a className="mobile-float-cta" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} />預約診斷對談</a>
    </div>
  )
}

export default App
