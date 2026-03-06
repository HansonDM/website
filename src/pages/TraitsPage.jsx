import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Search,
  Target,
  Users,
  Brain,
  Heart,
  Star,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Eye,
  Compass,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Mail,
  Phone,
  Building2,
  User,
  MessageSquare,
  Send,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react'

import seeItModuleImg from '../assets/see_it_module.png'
import seeItVennImg from '../assets/see_it_venn.png'

function TraitsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    teamSize: '',
    interest: [],
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestChange = (value) => {
    setFormData(prev => ({
      ...prev,
      interest: prev.interest.includes(value)
        ? prev.interest.filter(i => i !== value)
        : [...prev.interest, value]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 構建 Google Form 提交 URL
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdZUb_CSKZjUrRQ9wfs39jX6qc8FBcddWyAvt_23cG7d-zIOw/formResponse'
    
    const formBody = new URLSearchParams()
    formBody.append('entry.1234567890', formData.name)
    formBody.append('entry.1234567891', formData.company)
    formBody.append('entry.1234567892', formData.email)
    formBody.append('entry.1234567893', formData.phone)
    formBody.append('entry.1234567894', formData.message)

    // 使用 mailto 作為備用方案
    const mailtoSubject = encodeURIComponent(`【人才特質評測洽詢】${formData.company} - ${formData.name}`)
    const mailtoBody = encodeURIComponent(
      `姓名：${formData.name}\n` +
      `公司：${formData.company}\n` +
      `職稱：${formData.title}\n` +
      `Email：${formData.email}\n` +
      `電話：${formData.phone}\n` +
      `團隊規模：${formData.teamSize}\n` +
      `感興趣的評測：${formData.interest.join('、')}\n` +
      `需求說明：${formData.message}`
    )

    // 開啟 mailto
    window.location.href = `mailto:hanson.lin@hansondm.com?subject=${mailtoSubject}&body=${mailtoBody}`

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const gallupDomains = [
    { name: '執行力', en: 'Executing', color: 'from-purple-600 to-purple-800', icon: <Zap className="w-6 h-6" />, desc: '將想法付諸實踐的驅動力', themes: ['成就、統籌、信仰、公平、審慎、紀律、專注、責任、排難'] },
    { name: '影響力', en: 'Influencing', color: 'from-amber-500 to-amber-700', icon: <Star className="w-6 h-6" />, desc: '影響他人並推動行動的能力', themes: ['行動、統率、溝通、競爭、完美、自信、追求'] },
    { name: '關係建立', en: 'Relationship Building', color: 'from-blue-500 to-blue-700', icon: <Heart className="w-6 h-6" />, desc: '建立深厚連結與凝聚團隊', themes: ['適應、關聯、伯樂、體諒、和諧、包容、個別、積極、交往'] },
    { name: '策略思維', en: 'Strategic Thinking', color: 'from-green-600 to-green-800', icon: <Brain className="w-6 h-6" />, desc: '分析資訊並做出明智決策', themes: ['分析、回顧、前瞻、理念、蒐集、思維、學習、戰略'] }
  ]

  const hollandTypes = [
    { code: 'R', name: '實作型', en: 'Realistic', color: 'bg-red-500', desc: '喜歡動手操作、使用工具與機械，偏好具體、實際的工作環境。', roles: '工程師、技術人員、製造主管' },
    { code: 'I', name: '研究型', en: 'Investigative', color: 'bg-blue-600', desc: '喜歡觀察、分析與研究，善於運用邏輯思考解決複雜問題。', roles: '數據分析師、研發人員、策略規劃' },
    { code: 'A', name: '藝術型', en: 'Artistic', color: 'bg-purple-500', desc: '喜歡創造與自我表達，追求獨特性與美感，富有想像力。', roles: '設計師、品牌企劃、內容創作' },
    { code: 'S', name: '社會型', en: 'Social', color: 'bg-green-500', desc: '喜歡助人、教導與服務，善於溝通協調，關心他人需求。', roles: '人資、教育訓練、客戶服務' },
    { code: 'E', name: '企業型', en: 'Enterprising', color: 'bg-amber-500', desc: '喜歡領導、說服與管理，具備冒險精神與商業敏銳度。', roles: '業務主管、專案經理、創業家' },
    { code: 'C', name: '事務型', en: 'Conventional', color: 'bg-gray-600', desc: '喜歡組織、整理與數據處理，注重細節與系統化流程。', roles: '財務、行政管理、品質管控' }
  ]

  const enneagramTypes = [
    { num: 1, name: '完美主義者', trait: '有原則、自律、追求卓越', stress: '壓力下可能變得過度批判', color: 'bg-slate-700' },
    { num: 2, name: '助人者', trait: '慷慨、關懷、善於連結', stress: '壓力下可能過度付出而忽略自我', color: 'bg-rose-600' },
    { num: 3, name: '成就者', trait: '適應力強、目標導向、高效', stress: '壓力下可能過度追求形象', color: 'bg-amber-600' },
    { num: 4, name: '浪漫主義者', trait: '自我意識強、敏感、獨特', stress: '壓力下可能陷入情緒低谷', color: 'bg-indigo-600' },
    { num: 5, name: '觀察者', trait: '洞察力強、獨立、善於分析', stress: '壓力下可能過度退縮封閉', color: 'bg-cyan-700' },
    { num: 6, name: '忠誠者', trait: '負責、警覺、重視安全', stress: '壓力下可能過度焦慮猶豫', color: 'bg-emerald-700' },
    { num: 7, name: '享樂主義者', trait: '多才多藝、樂觀、充滿活力', stress: '壓力下可能逃避困難', color: 'bg-orange-500' },
    { num: 8, name: '挑戰者', trait: '自信、果斷、具領導力', stress: '壓力下可能過度控制', color: 'bg-red-700' },
    { num: 9, name: '和平主義者', trait: '隨和、包容、善於調和', stress: '壓力下可能過度順從', color: 'bg-teal-600' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 導航列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">返回首頁</span>
              </a>
              <span className="text-gray-300">|</span>
              <h1 className="text-xl font-bold text-gray-900">韓森管理顧問</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToSection('hero')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">概覽</button>
              <button onClick={() => scrollToSection('gallup')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">蓋洛普優勢</button>
              <button onClick={() => scrollToSection('holland')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">何倫興趣碼</button>
              <button onClick={() => scrollToSection('enneagram')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">九型人格</button>
              <button onClick={() => scrollToSection('contact-form')} className="px-4 py-2 rounded-md text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors">立即洽詢</button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">概覽</button>
              <button onClick={() => scrollToSection('gallup')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">蓋洛普優勢</button>
              <button onClick={() => scrollToSection('holland')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">何倫興趣碼</button>
              <button onClick={() => scrollToSection('enneagram')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">九型人格</button>
              <button onClick={() => scrollToSection('contact-form')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-amber-600 text-white hover:bg-amber-700 mx-1">立即洽詢</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #c9a84c 1px, transparent 1px), radial-gradient(circle at 75% 75%, #c9a84c 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-5 py-2 mb-8">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">SDB 三部曲 — 模組一</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            See It<span className="text-amber-400">：</span>覺察戰位
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/90 mb-4 font-medium">
            從錯置覺察到「對的位置」
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            停止猜測，開始看見。運用三大科學評測工具，精準定義每位人才的最佳「戰位」，<br className="hidden md:block" />
            讓天賦與職能完美對齊，從根本解決組織內耗。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => scrollToSection('gallup')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 text-lg rounded-lg shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40"
            >
              探索三大評測工具 <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button 
              onClick={() => scrollToSection('contact-form')}
              variant="outline"
              className="border-2 border-amber-400/50 text-amber-300 hover:bg-amber-400/10 px-8 py-6 text-lg rounded-lg"
            >
              立即洽詢方案
            </Button>
          </div>

          {/* 核心數據 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2">90%</div>
              <div className="text-gray-300">績效瓶頸源於人才錯置</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2">6x</div>
              <div className="text-gray-300">善用天賦者敬業度提升</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2">3</div>
              <div className="text-gray-300">維度科學定位最適戰位</div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心理念：什麼是「戰位」？ */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              何謂「戰位」？<span className="text-amber-600">它不是能力，而是三者的最佳交集</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              「人不錯，只是位置不對。」管理者的任務不是補強弱點，而是串連優勢。
              當天賦、興趣與性格三者交會，就是一個人發揮最大效能的「黃金戰位」。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={seeItVennImg} 
                alt="戰位三維交集圖：天賦、興趣、性格" 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">天賦 Talent</h3>
                  <p className="text-gray-600">與生俱來的思考、感受與行為模式。透過 <strong>Gallup CliftonStrengths</strong> 發現您的底層優勢。</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">興趣 Interest</h3>
                  <p className="text-gray-600">驅動熱情與投入的內在動力。透過 <strong>Holland Code</strong> 鎖定您的熱情任務。</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">性格 Personality</h3>
                  <p className="text-gray-600">面對壓力與挑戰時的核心反應模式。透過 <strong>WEPSS 九型人格</strong> 預測壓力行為。</p>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <p className="text-amber-800 font-medium text-center">
                  「不再憑感覺用人，而是用數據定義戰位。」<br />
                  <span className="text-sm text-amber-600">— 韓森管理顧問 SDB 核心理念</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 評測工具一：蓋洛普 CliftonStrengths */}
      <section id="gallup" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-1.5 mb-4">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">評測工具一</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gallup CliftonStrengths<br />
              <span className="text-purple-600">蓋洛普優勢測驗</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              全球最具公信力的天賦測驗，已有超過 3,000 萬人完成測評。
              透過 34 項天賦主題，科學化地發現每個人與生俱來的優勢模式，
              讓管理者能精準理解團隊成員的核心驅動力。
            </p>
          </div>

          {/* 四大領域 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {gallupDomains.map((domain, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-90`}></div>
                <div className="relative p-6 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    {domain.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{domain.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{domain.en}</p>
                  <p className="text-white/90 text-sm mb-4">{domain.desc}</p>
                  <div className="text-white/60 text-xs leading-relaxed">
                    {domain.themes[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 企業應用價值 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">企業導入蓋洛普的關鍵價值</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">敬業度提升 6 倍</h4>
                <p className="text-gray-600 text-sm">善用天賦的員工，敬業度是一般員工的 6 倍，工作投入度與滿意度顯著提升。</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">團隊績效提升 12.5%</h4>
                <p className="text-gray-600 text-sm">以優勢為基礎的團隊，整體生產力與協作效率大幅提升，減少內耗與衝突。</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">精準人才配置</h4>
                <p className="text-gray-600 text-sm">根據個人天賦進行科學化的任務分配，讓每位成員在最適合的崗位發揮最大效能。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 評測工具二：Holland Code */}
      <section id="holland" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 mb-4">
              <Compass className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">評測工具二</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Holland Code / RIASEC<br />
              <span className="text-blue-600">何倫興趣碼</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              由美國心理學家 John L. Holland 博士提出的職業興趣理論，
              將人格特質與職業環境分為六大類型（RIASEC）。
              當個人興趣與工作環境高度匹配時，工作滿意度與績效將顯著提升。
            </p>
          </div>

          {/* 六大類型 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {hollandTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4 p-6">
                  <div className={`w-14 h-14 ${type.color} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold group-hover:scale-110 transition-transform`}>
                    {type.code}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                    <p className="text-gray-500 text-sm">{type.en}</p>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 text-sm mb-3">{type.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>適合角色：{type.roles}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 企業應用 */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">何倫興趣碼的企業應用場景</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">人才招聘精準配對</h4>
                  <p className="text-gray-600 text-sm">在招聘階段即可評估候選人的興趣傾向與職位環境的匹配度，降低錯置風險。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">職務設計與輪調</h4>
                  <p className="text-gray-600 text-sm">依據員工的興趣碼組合，設計更符合其內在動力的工作內容與發展路徑。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">團隊互補分析</h4>
                  <p className="text-gray-600 text-sm">透過團隊成員的興趣碼分布，找出團隊的優勢與盲點，進行互補式的人才佈局。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">內部轉職與接班規劃</h4>
                  <p className="text-gray-600 text-sm">協助員工找到組織內最適合的發展方向，提升留才率與職涯滿意度。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 評測工具三：WEPSS 九型人格 */}
      <section id="enneagram" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-100 rounded-full px-4 py-1.5 mb-4">
              <Shield className="w-4 h-4 text-teal-600" />
              <span className="text-teal-700 text-sm font-medium">評測工具三</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WEPSS 九型人格<br />
              <span className="text-teal-600">Wagner Enneagram Personality Style Scales</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              由 Jerome Wagner 博士開發，基於九柱圖（Enneagram）的古老智慧與現代心理學研究。
              透過 200 個詞彙評量，深入揭示每個人的核心動機、恐懼模式與壓力反應，
              幫助管理者預測團隊成員在高壓情境下的行為傾向。
            </p>
          </div>

          {/* 九型人格卡片 */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {enneagramTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className={`${type.color} px-5 py-3 flex items-center gap-3`}>
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">{type.num}</span>
                  <span className="text-white font-bold">{type.name}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{type.trait}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-500 text-sm">{type.stress}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 企業應用價值 */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">九型人格的企業管理價值</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">預測壓力反應</h4>
                <p className="text-gray-600 text-sm">了解每位成員在壓力下的行為傾向，提前制定管理策略，避免團隊在關鍵時刻崩盤。</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">改善溝通協作</h4>
                <p className="text-gray-600 text-sm">理解不同人格類型的溝通偏好與地雷，建立更有效的跨部門對話與合作模式。</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">領導力發展</h4>
                <p className="text-gray-600 text-sm">幫助管理者認識自身的領導風格盲點，從「管事」升級為「帶心」的教練式領導。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三合一整合價值 */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              三大評測 <span className="text-amber-400">×</span> 一套系統 <span className="text-amber-400">×</span> 精準戰位
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              單一評測只能看見片面，三維交叉才能定義全貌。
              韓森管理顧問獨創的「戰位潛能雷達圖」，整合三種評測數據，
              為每位人才繪製專屬的戰位地圖。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gallup</h3>
              <p className="text-amber-300 font-medium mb-2">發現天賦</p>
              <p className="text-gray-400 text-sm">回答「我天生擅長什麼？」</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Holland</h3>
              <p className="text-amber-300 font-medium mb-2">鎖定興趣</p>
              <p className="text-gray-400 text-sm">回答「什麼任務讓我充滿熱情？」</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">WEPSS</h3>
              <p className="text-amber-300 font-medium mb-2">預測壓力</p>
              <p className="text-gray-400 text-sm">回答「壓力下我會如何反應？」</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl px-8 py-5">
              <p className="text-slate-900 font-bold text-lg">
                天賦 × 興趣 × 性格 ＝ 最適戰位（Optimal Strategic Position）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 導入流程 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">企業導入流程</h2>
            <p className="text-lg text-gray-600">從評測到落地，我們提供完整的顧問陪伴</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '需求診斷', desc: '了解企業現況、痛點與目標，制定客製化的評測方案。', icon: <Search className="w-6 h-6" /> },
              { step: '02', title: '科學評測', desc: '團隊成員完成三大評測，取得個人天賦、興趣與性格數據。', icon: <Brain className="w-6 h-6" /> },
              { step: '03', title: '戰位分析', desc: '顧問團隊整合數據，繪製個人戰位雷達圖與團隊職能地圖。', icon: <Target className="w-6 h-6" /> },
              { step: '04', title: '策略落地', desc: '提供人才配置建議，搭配 90 天行動卡，確保覺察轉化為行動。', icon: <Zap className="w-6 h-6" /> }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all h-full">
                  <div className="text-amber-500 font-bold text-3xl mb-3">{item.step}</div>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-3 text-amber-600">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-amber-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 洽詢表單 */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              開始您的人才戰位診斷之旅
            </h2>
            <p className="text-lg text-gray-600">
              留下您的聯絡資訊，我們的顧問團隊將在 24 小時內與您聯繫，<br className="hidden md:block" />
              為您量身規劃最適合的評測方案。
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 bg-green-50 rounded-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">感謝您的洽詢！</h3>
              <p className="text-gray-600 mb-6">我們的顧問團隊將盡快與您聯繫。</p>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                再次填寫
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="請輸入您的姓名"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    公司名稱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="請輸入公司名稱"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Award className="w-4 h-4 inline mr-1" />
                    職稱
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="例如：人資主管、部門經理"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    電子郵件 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    聯絡電話 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="09xx-xxx-xxx"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    團隊規模
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                  >
                    <option value="">請選擇</option>
                    <option value="1-10">1-10 人</option>
                    <option value="11-50">11-50 人</option>
                    <option value="51-200">51-200 人</option>
                    <option value="201-500">201-500 人</option>
                    <option value="500+">500 人以上</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  感興趣的評測工具（可複選）
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'gallup', label: 'Gallup 蓋洛普優勢測驗' },
                    { value: 'holland', label: 'Holland 何倫興趣碼' },
                    { value: 'wepss', label: 'WEPSS 九型人格' },
                    { value: 'all', label: '三合一完整方案' }
                  ].map(item => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleInterestChange(item.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        formData.interest.includes(item.value)
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {formData.interest.includes(item.value) && <CheckCircle className="w-4 h-4 inline mr-1" />}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  需求說明
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="請簡述您的需求或想解決的問題，例如：團隊績效不彰、人才流失嚴重、想進行組織重整..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white resize-none"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-6 text-lg rounded-lg shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      送出中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      送出洽詢
                    </span>
                  )}
                </Button>
                <p className="text-gray-500 text-sm mt-4">
                  送出後將開啟您的郵件客戶端，我們的顧問團隊將在 24 小時內回覆。
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">韓森管理顧問</h3>
              <p className="text-gray-400">
                成為亞洲職涯發展與企業數位轉型的領航者
              </p>
              <p className="text-gray-500 text-sm mt-2">
                「人不錯，只是位置不對。」
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">快速連結</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">首頁</a></li>
                <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors">關於我們</a></li>
                <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">核心服務</a></li>
                <li><a href="/#cases" className="text-gray-400 hover:text-white transition-colors">成功案例</a></li>
                <li><a href="/#podcast" className="text-gray-400 hover:text-white transition-colors">Podcast</a></li>
                <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors">聯絡我們</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">聯絡方式</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hanson.lin@hansondm.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +886-982-899889</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 韓森管理顧問有限公司. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TraitsPage
