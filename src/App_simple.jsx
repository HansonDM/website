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

// 導入圖片
import homepageBanner from './assets/homepage_banner.jpg'
import teamPhoto from './assets/team_photo.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

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
    { id: 'solutions', label: '解憂方案' },
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
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`${entry.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {entry.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
                  <p className="text-sm opacity-80">{entry.description}</p>
                </CardContent>
              </Card>
            ))}
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
              <p className="text-lg text-gray-700 mb-6">
                韓森管理顧問成立於2020年，由一群具有豐富企業經驗的專業顧問共同創立。我們深信每個企業和個人都有無限的潛能，只需要正確的引導和支持。
              </p>
              <p className="text-lg text-gray-700 mb-6">
                我們的使命是透過專業的諮詢服務，協助企業解決營運挑戰，同時幫助個人實現職涯目標。我們不只是顧問，更是您成功路上的夥伴。
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-700">同理心</span>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700">創新思維</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">專業可靠</span>
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
        </div>
      </section>

      {/* 解憂方案 */}
      <section id="solutions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">解憂方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們提供全方位的解決方案，從企業服務到個人發展，再到數位工具應用，滿足您的各種需求。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">企業服務</h3>
                <p className="text-gray-700 mb-4">組織診斷、人才盤點、ESG永續發展方案</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    組織健檢評估
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    人才盤點評估
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ESG策略規劃
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">人才培訓</h3>
                <p className="text-gray-700 mb-4">職涯領導力課程、生涯發展師認證</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    領導力培訓
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    教練認證課程
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    一對一陪跑
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">數位工具</h3>
                <p className="text-gray-700 mb-4">AI職涯助理、數據分析工具</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    AI職涯分析
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    心理測驗量表
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    數據視覺化
                  </li>
                </ul>
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
              準備好開始您的解憂之旅了嗎？讓我們了解您的需求，為您提供最適合的解決方案。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 聯絡資訊 */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Button size="lg" className="w-full">
                  <Phone className="w-5 h-5 mr-2" />
                  預約免費初談
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <Download className="w-5 h-5 mr-2" />
                  下載白皮書
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">聯絡方式</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <span>+886-2-1234-5678</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <span>info@hansen-consulting.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <span>台北市信義區信義路五段7號</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-blue-600 mr-3" />
                      <span>www.hansen-consulting.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 簡化的諮詢表單 */}
            <Card>
              <CardHeader>
                <CardTitle>留下您的煩惱</CardTitle>
                <CardDescription>我們將根據您的需求，安排最適合的顧問與您聯繫</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="姓名 *" />
                  <Input type="email" placeholder="電子郵件 *" />
                  <Input placeholder="公司名稱（選填）" />
                  <Textarea placeholder="詳細描述您的煩惱或需求 *" rows={4} />
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    提交諮詢
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">韓森管理顧問有限公司</h3>
            <p className="text-gray-400 mb-4">企業解憂 × 職涯領航</p>
            <p className="text-gray-400 text-sm">
              &copy; 2024 韓森管理顧問有限公司. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
