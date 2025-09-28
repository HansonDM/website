import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import {
  Menu,
  X,
  ChevronRight,
  Users,
  Target,
  TrendingUp,
  Brain,
  Award,
  BookOpen,
  Cpu,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  Download,
  Play,
  Star,
  Lightbulb,
  Heart,
  Shield,
  HelpCircle,
  Bot
} from 'lucide-react'
import './App.css'
import { BusinessTroubleQuiz, AICareerAssistantDemo, XiaoYouChatbot, SROIESGVisualization } from './components/InteractiveFeatures.jsx'

// 導入圖片
import homepageBanner from './assets/homepage_banner.jpg'
import teamPhoto from './assets/team_photo.jpg'
import cxFramework from './assets/enterprise_service_cx_framework.png'
import talentMapping from './assets/enterprise_service_talent_mapping.png'
import esgImage from './assets/enterprise_service_esg.jpg'
import leadershipTraining from './assets/talent_training_leadership.png'
import coachCertification from './assets/talent_training_coach_certification.png'
import coachingImage from './assets/talent_training_coaching.jpg'
import aiAssistant from './assets/digital_tool_ai_assistant.png'
import resilienceCards from './assets/digital_tool_resilience_cards.jpg'
import dataAnalytics from './assets/digital_tool_data_analytics.png'
import businessCase from './assets/case_study_business.png'
import careerCase from './assets/case_study_career.jpg'
import digitalCase from './assets/case_study_digital_transformation.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    problemType: '',
    description: ''
  })
  const [showQuiz, setShowQuiz] = useState(false)
  const [showAIDemo, setShowAIDemo] = useState(false)
  const [quizResult, setQuizResult] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    alert('感謝您的諮詢！我們將盡快與您聯繫。')
    setFormData({
      name: '',
      email: '',
      company: '',
      problemType: '',
      description: ''
    })
  }

  const navigation = [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於我們' },
    { id: 'solutions', label: '解憂方案' },
    { id: 'cases', label: '成功案例' },
    { id: 'insights', label: '內容專區' },
    { id: 'contact', label: '聯絡我們' }
  ]

  const quickEntries = [
    {
      icon: <Target className="w-8 h-8" />,
      title: '企業解憂方案',
      description: '組織診斷、人才盤點、ESG永續發展',
      color: 'bg-blue-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '職涯領導力',
      description: '領導力課程、生涯發展師認證',
      color: 'bg-green-500'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: '數位工具與 AI',
      description: 'AI職涯助理、數據分析工具',
      color: 'bg-purple-500'
    }
  ]

  const teamMembers = [
    {
      name: '張執行長',
      position: '執行長暨首席顧問',
      keywords: ['組織發展', '策略規劃', '領導力'],
      image: teamPhoto
    },
    {
      name: '李總監',
      position: '人才發展總監',
      keywords: ['職涯諮詢', '教練認證', '人才培訓'],
      image: teamPhoto
    },
    {
      name: '王經理',
      position: '數位轉型經理',
      keywords: ['AI應用', '數據分析', '流程優化'],
      image: teamPhoto
    }
  ]

  const enterpriseServices = [
    {
      title: '組織診斷與客戶體驗優化',
      description: '透過系統性分析，提升組織效能與客戶滿意度，建立可持續的競爭優勢。',
      image: cxFramework,
      features: ['組織健檢評估', '客戶旅程分析', '流程優化建議', '績效指標設計']
    },
    {
      title: '關鍵人才盤點與職涯發展',
      description: '協助企業識別、培養及留住核心人才，規劃完整的員工職涯發展路徑。',
      image: talentMapping,
      features: ['人才盤點評估', '職涯路徑規劃', '接班人計畫', '留才策略設計']
    },
    {
      title: 'ESG × SROI 永續人才方案',
      description: '整合環境、社會、治理理念，推動永續發展與社會投資報酬率最大化。',
      image: esgImage,
      features: ['ESG策略規劃', 'SROI評估', '永續人才培育', '影響力測量']
    }
  ]

  const talentTraining = [
    {
      title: '職涯領導力課程',
      description: '培養個人在職場上的領導與影響力，提升團隊協作與溝通能力。',
      image: leadershipTraining,
      duration: '3個月',
      format: '線上+線下混合'
    },
    {
      title: '生涯發展師認證 / 教練陪跑',
      description: '提供專業認證課程與一對一教練服務，協助個人職涯成長與轉型。',
      image: coachCertification,
      duration: '6個月',
      format: '認證課程+實務演練'
    }
  ]

  const digitalTools = [
    {
      title: 'AI 職涯助理',
      description: '運用人工智慧技術，提供個人化的職涯建議與發展路徑規劃。',
      image: aiAssistant,
      features: ['智能職涯分析', '個人化建議', '技能評估', '市場趨勢預測']
    },
    {
      title: '生涯靭力牌卡 / 心理測驗量表',
      description: '透過科學化的評估工具，協助個人深度自我探索與職涯定位。',
      image: resilienceCards,
      features: ['性格特質分析', '職業興趣測驗', '價值觀評估', '生涯韌力測量']
    },
    {
      title: '企業流程優化與數據分析',
      description: '運用數位工具提升企業營運效率，透過數據驅動決策優化。',
      image: dataAnalytics,
      features: ['流程自動化', '數據視覺化', '績效監控', '預測分析']
    }
  ]

  const caseStudies = [
    {
      category: '企業組織案例',
      title: '某科技公司組織轉型',
      problem: '組織架構老化，跨部門協作效率低下',
      solution: '重新設計組織架構，建立敏捷工作模式',
      result: '工作效率提升40%，員工滿意度增加35%',
      image: businessCase
    },
    {
      category: '個人職涯案例',
      title: '中階主管職涯轉型',
      problem: '職涯發展遇到瓶頸，缺乏明確方向',
      solution: '透過職涯諮詢與教練陪跑，重新定位職涯目標',
      result: '成功轉職到理想企業，薪資提升50%',
      image: careerCase
    },
    {
      category: '數位轉型案例',
      title: '傳統製造業數位化',
      problem: '生產流程缺乏數位化，決策依賴經驗',
      solution: '導入數據分析系統，建立智能決策機制',
      result: '生產效率提升30%，成本降低20%',
      image: digitalCase
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 導航列 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">韓森管理顧問</h1>
            </div>
            
            {/* 桌面版導航 */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 手機版選單按鈕 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 手機版選單 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 首頁 */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${homepageBanner})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            企業解憂 × 職涯領航
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            韓森管理顧問有限公司 - 您的專業夥伴
          </p>
          
          {/* 三大快速入口 */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {quickEntries.map((entry, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  if (index === 0) setShowQuiz(true)
                  else if (index === 2) setShowAIDemo(true)
                  else scrollToSection('solutions')
                }}>
                <CardContent className="p-6 text-center">
                  <div className={`${entry.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {entry.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{entry.title}</h3>
                  <p className="text-sm text-gray-700">{entry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 互動功能按鈕 */}
          <div className="flex justify-center space-x-4 mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 border-white/30 text-gray-900 hover:bg-white/30"
              onClick={() => setShowQuiz(true)}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              企業煩惱快速診斷
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 border-white/30 text-gray-900 hover:bg-white/30"
              onClick={() => setShowAIDemo(true)}
            >
              <Bot className="w-5 h-5 mr-2" />
              體驗AI職涯助理
            </Button>
          </div>
          
        </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">關於我們</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              韓森管理顧問致力於成為企業與個人最信賴的解憂夥伴，以專業、創新的方法協助客戶實現目標。
            </p>
          </div>

          {/* 品牌故事 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">品牌故事</h3>
              <p className="text-lg text-gray-800 mb-6">
                韓森管理顧問成立於2020年，由一群具有豐富企業經驗的專業顧問共同創立。我們深信每個企業和個人都有無限的潛能，只需要正確的引導和支持。
              </p>
              <p className="text-lg text-gray-800 mb-6">
                我們的使命是透過專業的諮詢服務，協助企業解決營運挑戰，同時幫助個人實現職涯目標。我們不只是顧問，更是您成功路上的夥伴。
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-800">同理心</span>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-gray-800">創新思維</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-gray-800">專業可靠</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={teamPhoto} 
                alt="團隊照片" 
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* 企業解憂事務所精神 */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">企業解憂事務所精神</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">以人為本</h4>
                <p className="text-gray-600">相信每個人都有獨特的價值和潛能，致力於發掘並培養人才的核心競爭力。</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">目標導向</h4>
                <p className="text-gray-600">專注於客戶的實際需求，提供量身定制的解決方案，確保達成預期目標。</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">持續成長</h4>
                <p className="text-gray-600">追求卓越，不斷學習和創新，與客戶共同成長，創造長期價值。</p>
              </div>
            </div>
          </div>

          {/* 顧問團隊介紹 */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">顧問團隊</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                    <p className="text-gray-600 mb-4">{member.position}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* SROI/ESG 數據視覺化 */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">SROI / ESG 成效數據視覺化</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
              透過數據呈現我們在永續發展和社會影響力方面的具體成效，讓每一分投資都能創造可衡量的價值。
            </p>
            {/* <SROIESGVisualization /> */}
          </div>
        </div>
      </section>

      {/* 解憂方案 */}
      <section id="solutions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">解憂方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們提供三大核心解憂方案，為企業和個人量身打造，助您突破困境，實現卓越。
            </p>
          </div>

          {/* 企業服務 */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">企業服務</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {enterpriseServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 人才培訓 */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">人才培訓</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {talentTraining.map((training, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={training.image} 
                      alt={training.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-3">{training.title}</h4>
                    <p className="text-gray-700 mb-4">{training.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>期程：{training.duration}</span>
                      <span>形式：{training.format}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 數位工具 */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">數位工具</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {digitalTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={tool.image} 
                      alt={tool.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-3">{tool.title}</h4>
                    <p className="text-gray-700 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* SROI/ESG 數據視覺化 */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">SROI / ESG 成效數據視覺化</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
              透過數據呈現我們在永續發展和社會影響力方面的具體成效，讓每一分投資都能創造可衡量的價值。
            </p>
            {/* <SROIESGVisualization /> */}
          </div>
        </div>
      </section>

      {/* 成功案例 */}
      <section id="cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">成功案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              透過「問題 → 解憂方法 → 成效」的系統性方法，我們已協助眾多企業和個人達成目標。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">{caseStudy.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-4">{caseStudy.title}</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-1">問題</h5>
                      <p className="text-sm text-gray-700">{caseStudy.problem}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-blue-600 mb-1">解憂方法</h5>
                      <p className="text-sm text-gray-700">{caseStudy.solution}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-green-600 mb-1">成效</h5>
                      <p className="text-sm text-gray-700">{caseStudy.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* SROI/ESG 數據視覺化 */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">SROI / ESG 成效數據視覺化</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
              透過數據呈現我們在永續發展和社會影響力方面的具體成效，讓每一分投資都能創造可衡量的價值。
            </p>
            {/* <SROIESGVisualization /> */}
          </div>
        </div>
      </section>

      {/* 內容專區 */}
      <section id="insights" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">內容專區</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              豐富的內容資源，包含Podcast、專業文章和免費下載資源，助您持續學習成長。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Podcast 專區 */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Play className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Podcast 🎧</h3>
                </div>
                <h4 className="text-lg font-semibold mb-3">「企業解憂事務所」專區</h4>
                <p className="text-gray-700 mb-4">深度訪談企業領袖，分享經營智慧與解憂之道。</p>
                <Button variant="outline" className="w-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  前往收聽
                </Button>
              </CardContent>
            </Card>

            {/* 文章 / Blog */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">文章 / Blog</h3>
                </div>
                <h4 className="text-lg font-semibold mb-3">職涯、永續、AI × HR</h4>
                <p className="text-gray-700 mb-4">最新產業洞察、專業知識分享，助您掌握趨勢。</p>
                <Button variant="outline" className="w-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  閱讀更多
                </Button>
              </CardContent>
            </Card>

            {/* 免費資源下載 */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">免費資源下載</h3>
                </div>
                <h4 className="text-lg font-semibold mb-3">工具表單、小冊子</h4>
                <p className="text-gray-700 mb-4">實用工具與精選資料，助您提升工作效率。</p>
                <Button variant="outline" className="w-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  立即下載
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 聯絡我們 */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">聯絡我們</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              無論是企業挑戰或個人職涯困惑，歡迎隨時與我們聯繫，讓我們成為您的解憂夥伴。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 諮詢表單 */}
            <Card className="p-8 shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl font-bold">諮詢表單</CardTitle>
                <CardDescription className="text-gray-600">留下您的煩惱，我們將為您匹配最適合的顧問。</CardDescription>
              </CardHeader>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="您的姓名"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="您的電子郵件"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">公司名稱 (選填)</label>
                  <Input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="您的公司名稱"
                  />
                </div>
                <div>
                  <label htmlFor="problemType" className="block text-sm font-medium text-gray-700 mb-2">煩惱類型</label>
                  <Select 
                    value={formData.problemType}
                    onValueChange={(value) => setFormData({ ...formData, problemType: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="請選擇您的煩惱類型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="企業組織">企業組織</SelectItem>
                      <SelectItem value="個人職涯">個人職涯</SelectItem>
                      <SelectItem value="數位轉型">數位轉型</SelectItem>
                      <SelectItem value="永續發展">永續發展</SelectItem>
                      <SelectItem value="其他">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">詳細描述您的煩惱</label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="請詳細描述您遇到的問題或需求，以便我們提供更精準的協助。"
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  提交諮詢
                </Button>
              </form>
            </Card>

            {/* 聯絡資訊與CTA */}
            <div className="space-y-10">
              {/* 聯絡資訊 */}
              <Card className="p-8 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-bold">聯絡資訊</CardTitle>
                  <CardDescription className="text-gray-600">隨時與我們保持聯繫。</CardDescription>
                </CardHeader>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span>+886-982-899-889</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span>contact@hansenconsulting.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <span>台北市信義區基隆路一段333號</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-blue-600 mr-3" />
                    <span>www.hansenconsulting.com</span>
                  </div>
                </div>
              </Card>

              {/* 合作機構 / 協會 Logo */}
              <Card className="p-8 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-bold">合作夥伴</CardTitle>
                  <CardDescription className="text-gray-600">我們與業界頂尖機構攜手合作，提供最優質的服務。</CardDescription>
                </CardHeader>
                <div className="grid grid-cols-3 gap-6 items-center justify-center">
                  <img src="https://via.placeholder.com/100x50?text=Partner1" alt="Partner 1" className="mx-auto opacity-75 hover:opacity-100 transition-opacity" />
                  <img src="https://via.placeholder.com/100x50?text=Partner2" alt="Partner 2" className="mx-auto opacity-75 hover:opacity-100 transition-opacity" />
                  <img src="https://via.placeholder.com/100x50?text=Partner3" alt="Partner 3" className="mx-auto opacity-75 hover:opacity-100 transition-opacity" />
                  <img src="https://via.placeholder.com/100x50?text=Partner4" alt="Partner 4" className="mx-auto opacity-75 hover:opacity-100 transition-opacity" />
                  <img src="https://via.placeholder.com/100x50?text=Partner5" alt="Partner 5" className="mx-auto opacity-75 hover:opacity-100 transition-opacity" />
                  <img src="https://via.placeholder.com/100x50?text=Partner6" alt="Partner 6" className="mx-auto opacity-75 hover:opacity-100 transition-opacity" />
                </div>
              </Card>

              {/* CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">
                  <Star className="w-6 h-6 mr-3" />
                  預約免費初談
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 py-6 text-lg">
                  <Download className="w-6 h-6 mr-3" />
                  下載白皮書
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 小優對話框 */}
      <XiaoYouChatbot />

      {/* 頁腳 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 韓森管理顧問有限公司. All rights reserved.</p>
        </div>
      </footer>

      {/* 互動功能 */}
      {showQuiz && <BusinessTroubleQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} onResult={setQuizResult} />}
      {showAIDemo && <AICareerAssistantDemo isOpen={showAIDemo} onClose={() => setShowAIDemo(false)} />}
    </div>
  )
}

export default App
