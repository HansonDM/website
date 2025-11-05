import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

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
  Bot,
  Leaf,
  Zap,
  LineChart
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



  const navigation = [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於我們' },
    { id: 'services', label: '核心服務' },
    { id: 'cases', label: '成功案例' },
    { id: 'contact', label: '聯絡我們' }
  ]

  const quickEntries = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'ESG策略與人力資源',
      description: '環境、社會、治理目標與人力資源實踐對齊',
      color: 'bg-blue-500'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: '數位顧問',
      description: '協助企業整合AI工具並優化數位流程',
      color: 'bg-purple-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '職涯與人才盤點',
      description: '評估員工技能和偏好,進行職涯規劃',
      color: 'bg-green-500'
    }
  ]

  // 更新團隊成員資訊,新增吳志倫顧問
  const teamMembers = [
    {
      name: 'Hanson Lin 林明輝',
      position: '韓森管理顧問有限公司負責人',
      description: '企業解憂事務所共同創辦人、諾亞未來人才教育學會理事',
      keywords: ['職涯領導力', '客戶服務管理', '企業數位轉型', '數位行銷', '專案管理', '資訊管理'],
      image: teamPhoto
    },
    {
      name: 'Vincent C. L. Wu 吳志倫',
      position: '全球市場拓展與品牌戰略顧問',
      description: '蓋洛普優勢認證教練,擁有超過25年橫跨亞洲、歐洲與非洲的國際市場及大型零售旗艦/商業地產實戰經驗',
      keywords: ['人才發展', '品牌管理', '通路開發', '顧客體驗', '全球時尚EMBA客座講師'],
      brands: ['Louis Vuitton', 'Chanel', 'CHAUMET', 'JOYCE', 'Starbucks'],
      image: teamPhoto
    }
  ]

  // 更新核心服務架構
  const coreServices = [
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: 'ESG策略與人力資源',
      description: '將環境、社會和治理目標與人力資源實踐對齊。',
      details: [
        '永續發展策略規劃',
        '社會責任實踐',
        '公司治理優化',
        '人力資源ESG整合'
      ]
    },
    {
      icon: <Cpu className="w-12 h-12 text-blue-600" />,
      title: '數位顧問',
      description: '協助企業整合AI工具並優化數位流程。',
      details: [
        'AI工具導入與應用',
        '數位轉型策略',
        '流程數位化',
        '智能決策系統'
      ]
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-orange-600" />,
      title: '員工關係與溝通',
      description: '診斷並改善內部溝通以增強員工關係。',
      details: [
        '內部溝通診斷',
        '員工關係改善',
        '團隊協作優化',
        '組織文化建設'
      ]
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: '職涯與人才盤點',
      description: '評估員工的技能和偏好,以進行職涯規劃。',
      details: [
        '人才技能評估',
        '職涯路徑規劃',
        '接班人計畫',
        '核心人才識別'
      ]
    },
    {
      icon: <BookOpen className="w-12 h-12 text-red-600" />,
      title: '職涯規劃與內訓',
      description: '設計客製化的培訓計劃以促進員工成長。',
      details: [
        '客製化培訓設計',
        '領導力發展',
        '專業技能提升',
        '個人發展計畫(IDP)'
      ]
    },
    {
      icon: <LineChart className="w-12 h-12 text-indigo-600" />,
      title: '專案管理與流程優化',
      description: '實施敏捷方法以提高效率。',
      details: [
        '敏捷專案管理',
        '流程優化改善',
        '效率提升方案',
        '績效監控系統'
      ]
    }
  ]

  const partnerBrands = [
    { name: '裕隆集團', category: '製造業' },
    { name: 'Microsoft', category: '科技業' },
    { name: 'BIONIME 博寧', category: '醫療器材' },
    { name: 'gogoro', category: '智慧移動' },
    { name: 'CORNING', category: '材料科學' },
    { name: 'Louis Vuitton', category: '精品零售' },
    { name: 'Chanel', category: '精品零售' },
    { name: 'CHAUMET', category: '精品珠寶' },
    { name: 'JOYCE', category: '時尚零售' },
    { name: 'Starbucks', category: '餐飲連鎖' }
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
            人 × 數據 × 未來
          </h1>
          <p className="text-2xl md:text-3xl mb-4 opacity-90 font-semibold">
            成為亞洲職涯發展與企業數位轉型的領航者
          </p>
          <p className="text-xl md:text-2xl mb-12 opacity-80">
            韓森管理顧問有限公司 - 打造管理典範
          </p>
          
          {/* 三大快速入口 */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {quickEntries.map((entry, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`${entry.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    {entry.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
                  <p className="text-sm opacity-90">{entry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => scrollToSection('contact')}
            >
              立即諮詢
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => scrollToSection('services')}
            >
              了解服務
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
              在未來,能持續成長的企業,必須同時掌握<strong>數據化的決策能力</strong>與<strong>以人為本的領導力</strong>,這正是我們的獨特定位與價值所在。
            </p>
          </div>

          {/* 企業願景 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 mb-16 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">企業願景</h3>
            <p className="text-2xl font-semibold mb-2">成為亞洲職涯發展與企業數位轉型的領航者</p>
            <p className="text-xl opacity-90">打造「人 × 數據 × 未來」管理典範</p>
          </div>

          {/* 顧問團隊介紹 */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">顧問團隊</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-24 h-24 rounded-full object-cover mr-6"
                      />
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-2">{member.name}</h4>
                        <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                        <p className="text-gray-700 text-sm">{member.description}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">專業領域：</h5>
                      <div className="flex flex-wrap gap-2">
                        {member.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                    {member.brands && (
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">曾任職品牌：</h5>
                        <p className="text-gray-600 text-sm">{member.brands.join(', ')}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 合作品牌 */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">合作品牌</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {partnerBrands.map((brand, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-100 rounded-lg p-4 mb-2 hover:bg-gray-200 transition-colors">
                      <p className="font-semibold text-gray-800">{brand.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{brand.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心服務 */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心服務</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              六大核心服務領域,為企業提供全方位的管理諮詢與解決方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 成功案例 */}
      <section id="cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">成功案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              實際案例展示我們如何協助企業與個人達成目標
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((caseItem, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">{caseItem.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{caseItem.title}</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-red-600 mb-1">問題：</p>
                      <p className="text-gray-700">{caseItem.problem}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600 mb-1">解決方案：</p>
                      <p className="text-gray-700">{caseItem.solution}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-600 mb-1">成果：</p>
                      <p className="text-gray-700">{caseItem.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡我們 */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">聯絡我們</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              歡迎與我們聯繫,讓我們一起探討如何協助您達成目標
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 聯絡資訊 */}
            <div>
              <h3 className="text-2xl font-bold mb-6">聯絡資訊</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">電子郵件</p>
                    <a href="mailto:hanson.lin@hansondm.com" className="text-blue-600 hover:underline">
                      hanson.lin@hansondm.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">電話</p>
                    <a href="tel:+886982899889" className="text-blue-600 hover:underline">
                      +886-982-899889
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MessageCircle className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">LINE</p>
                    <a href="https://lin.ee/X8h0cv5" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      點此加入 LINE 官方帳號
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Google Calendar 預約</p>
                    <a href="https://calendar.app.google/gsmSP4Yu1vvqYxub8" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      點此預約諮詢時間
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Forms 嵌入 */}
            <div>
              <h3 className="text-2xl font-bold mb-6">線上諮詢</h3>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{height: '1000px'}}>
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfMKueT9qwmBsAFvTeWnYExu_UITI8_ceqFkB0icH7gj8/viewform?embedded=true" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  title="韓森管理顧問線上諮詢表單"
                >
                  載入中…
                </iframe>
              </div>
            </div>
          </div>
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
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">快速連結</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">聯絡方式</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: hanson.lin@hansondm.com</li>
                <li>電話: +886-982-899889</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 韓森管理顧問有限公司. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 互動功能彈窗 */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">企業煩惱快速診斷</h3>
                <button onClick={() => setShowQuiz(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <BusinessTroubleQuiz onComplete={(result) => {
                setQuizResult(result)
                setShowQuiz(false)
              }} />
            </div>
          </div>
        </div>
      )}

      {showAIDemo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">AI職涯助理體驗</h3>
                <button onClick={() => setShowAIDemo(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <AICareerAssistantDemo />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
