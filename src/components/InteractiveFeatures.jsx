import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  Users,
  TrendingUp,
  Cpu
} from 'lucide-react'

// 企業煩惱測驗組件
export function BusinessTroubleQuiz({ isOpen, onClose, onResult }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      question: "您的企業目前面臨的最大挑戰是什麼？",
      options: [
        { text: "組織效率低下", category: "organization" },
        { text: "人才流失嚴重", category: "talent" },
        { text: "數位轉型困難", category: "digital" },
        { text: "客戶滿意度下降", category: "customer" }
      ]
    },
    {
      question: "您希望在多長時間內看到改善？",
      options: [
        { text: "1-3個月", category: "urgent" },
        { text: "3-6個月", category: "medium" },
        { text: "6-12個月", category: "long" },
        { text: "1年以上", category: "strategic" }
      ]
    },
    {
      question: "您的企業規模是？",
      options: [
        { text: "50人以下", category: "small" },
        { text: "50-200人", category: "medium" },
        { text: "200-1000人", category: "large" },
        { text: "1000人以上", category: "enterprise" }
      ]
    }
  ]

  const solutions = {
    organization: {
      title: "組織診斷與客戶體驗優化",
      description: "透過系統性分析，重新設計組織架構，提升整體營運效率。",
      features: ["組織健檢評估", "流程優化建議", "績效指標設計"]
    },
    talent: {
      title: "關鍵人才盤點與職涯發展",
      description: "建立完整的人才管理體系，提升員工滿意度與留任率。",
      features: ["人才盤點評估", "職涯路徑規劃", "留才策略設計"]
    },
    digital: {
      title: "數位工具與流程優化",
      description: "導入數位化工具，建立數據驅動的決策機制。",
      features: ["流程自動化", "數據視覺化", "預測分析"]
    },
    customer: {
      title: "客戶體驗優化方案",
      description: "深度分析客戶旅程，提升客戶滿意度與忠誠度。",
      features: ["客戶旅程分析", "體驗優化建議", "滿意度監控"]
    }
  }

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 根據答案推薦解決方案
      const primaryCategory = newAnswers[0].category
      setShowResult(true)
      onResult(solutions[primaryCategory])
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>企業煩惱快速診斷</CardTitle>
            <CardDescription>3個問題，找到最適合的解決方案</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    問題 {currentQuestion + 1} / {questions.length}
                  </span>
                  <div className="flex space-x-1">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index <= currentQuestion ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 hover:bg-blue-50"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">診斷完成！</h3>
                <p className="text-gray-600">根據您的回答，我們推薦以下解決方案：</p>
              </div>

              <Card className="text-left mb-6">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-2">{answers[0] && solutions[answers[0].category]?.title}</h4>
                  <p className="text-gray-700 mb-4">{answers[0] && solutions[answers[0].category]?.description}</p>
                  <div className="space-y-2">
                    {answers[0] && solutions[answers[0].category]?.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                  重新測驗
                </Button>
                <Button onClick={onClose} className="flex-1">
                  立即諮詢
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// AI職涯助理Demo組件
export function AICareerAssistantDemo({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '您好！我是AI職涯助理，可以協助您進行職涯規劃和發展建議。請問您目前的職業狀況如何？'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const aiResponses = {
    '轉職': '轉職是職涯發展的重要決定。建議您先評估目前技能與目標職位的匹配度，並制定技能提升計畫。我們的職涯諮詢服務可以協助您制定詳細的轉職策略。',
    '技能': '技能提升是職涯成長的關鍵。根據市場趨勢，建議重點發展數位技能、溝通協作能力和領導力。我們提供相關的培訓課程和認證服務。',
    '薪資': '薪資談判需要充分的市場調研和自我價值評估。建議您了解同職位的市場薪資水準，並準備具體的成就案例來支持您的要求。',
    '領導': '領導力是職場晉升的重要能力。建議從團隊協作、溝通技巧和決策能力開始培養。我們的領導力課程可以幫助您系統性地提升這些能力。'
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = { type: 'user', content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // 模擬AI回應
    setTimeout(() => {
      let aiResponse = '感謝您的問題！這是一個很好的職涯發展議題。'
      
      // 根據關鍵字提供相應回應
      Object.keys(aiResponses).forEach(keyword => {
        if (inputMessage.includes(keyword)) {
          aiResponse = aiResponses[keyword]
        }
      })

      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }])
      setIsTyping(false)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-96">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <CardTitle>AI職涯助理 Demo</CardTitle>
              <CardDescription>體驗智能職涯諮詢服務</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="輸入您的職涯問題..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 小優對話框組件
export function XiaoYouChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '嗨！我是小優，韓森管理顧問的智能助手。有什麼可以幫助您的嗎？'
    }
  ])
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  const quickReplies = [
    { text: '了解服務項目', icon: <Lightbulb className="w-4 h-4" /> },
    { text: '預約諮詢', icon: <Users className="w-4 h-4" /> },
    { text: '查看成功案例', icon: <TrendingUp className="w-4 h-4" /> },
    { text: '體驗AI工具', icon: <Cpu className="w-4 h-4" /> }
  ]

  const botResponses = {
    '了解服務項目': '我們提供三大類服務：\n1. 企業服務 - 組織診斷、人才盤點、ESG方案\n2. 人才培訓 - 領導力課程、教練認證\n3. 數位工具 - AI職涯助理、數據分析\n\n您對哪個服務最感興趣呢？',
    '預約諮詢': '太好了！我們提供免費的初次諮詢服務。您可以：\n1. 填寫網站上的諮詢表單\n2. 撥打電話 +886-2-1234-5678\n3. 發送郵件至 info@hansen-consulting.com\n\n我們會在24小時內與您聯繫！',
    '查看成功案例': '我們已協助眾多企業和個人達成目標：\n• 某科技公司組織轉型 - 效率提升40%\n• 中階主管職涯轉型 - 薪資提升50%\n• 傳統製造業數位化 - 成本降低20%\n\n您可以在網站的「成功案例」區域查看更多詳情！',
    '體驗AI工具': '我們的AI職涯助理可以提供個人化的職涯建議！您可以點擊網站上的「AI Career Assistant Demo」來體驗，或是現在就告訴我您的職涯問題，我來為您初步分析。'
  }

  const handleQuickReply = (reply) => {
    setMessages(prev => [...prev, { type: 'user', content: reply }])
    setShowQuickReplies(false)
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: botResponses[reply] || '感謝您的問題！我們的專業顧問會為您提供詳細的解答。' 
      }])
      setShowQuickReplies(true)
    }, 1000)
  }

  return (
    <>
      {/* 聊天機器人按鈕 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* 聊天視窗 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white rounded-t-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-500 font-bold text-sm">小優</span>
              </div>
              <div>
                <h3 className="font-semibold">小優助手</h3>
                <p className="text-xs opacity-90">線上為您服務</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {showQuickReplies && (
              <div className="p-4 border-t bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">快速選項：</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 justify-start"
                      onClick={() => handleQuickReply(reply.text)}
                    >
                      {reply.icon}
                      <span className="ml-1 truncate">{reply.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// SROI/ESG數據視覺化組件
export function SROIESGVisualization() {
  const sroiData = [
    { category: '員工培訓投資', investment: 100, return: 280, ratio: 2.8 },
    { category: '社區發展計畫', investment: 50, return: 150, ratio: 3.0 },
    { category: '環境保護措施', investment: 80, return: 200, ratio: 2.5 },
    { category: '供應鏈優化', investment: 120, return: 360, ratio: 3.0 }
  ]

  const esgMetrics = {
    environmental: { score: 85, trend: '+5%' },
    social: { score: 92, trend: '+8%' },
    governance: { score: 88, trend: '+3%' }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 my-12">
      {/* SROI 分析 */}
      <Card>
        <CardHeader>
          <CardTitle>SROI 社會投資報酬率分析</CardTitle>
          <CardDescription>每投入1元，創造的社會價值</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sroiData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{item.category}</h4>
                  <p className="text-sm text-gray-600">投資 ${item.investment}萬</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{item.ratio}:1</div>
                  <p className="text-sm text-gray-600">回報 ${item.return}萬</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ESG 評分 */}
      <Card>
        <CardHeader>
          <CardTitle>ESG 永續發展評分</CardTitle>
          <CardDescription>環境、社會、治理三大面向表現</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">環境 (Environmental)</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold">{esgMetrics.environmental.score}</span>
                  <Badge variant="secondary" className="ml-2 text-green-600">
                    {esgMetrics.environmental.trend}
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${esgMetrics.environmental.score}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">社會 (Social)</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold">{esgMetrics.social.score}</span>
                  <Badge variant="secondary" className="ml-2 text-green-600">
                    {esgMetrics.social.trend}
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${esgMetrics.social.score}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">治理 (Governance)</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold">{esgMetrics.governance.score}</span>
                  <Badge variant="secondary" className="ml-2 text-green-600">
                    {esgMetrics.governance.trend}
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${esgMetrics.governance.score}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
