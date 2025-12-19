import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '您好！我是企業解憂助手 🤖\n\n我可以幫您：\n• 推薦適合的 Podcast 集數\n• 解答企業管理問題\n• 提供職涯發展建議\n\n請問有什麼可以幫助您的嗎？'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // 添加用戶訊息
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('https://bscsconsult.zeabur.app/webhook/bd42b249-6f0f-4f5d-bb7f-232b591bba16/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      
      // 添加 AI 回覆
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.text || '抱歉，我現在無法回答這個問題。'
      }])
    } catch (error) {
      console.error('Chat API error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '抱歉，連線發生問題，請稍後再試。'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* 聊天視窗 */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <CardTitle className="text-lg font-bold">企業解憂助手</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="輸入您的問題..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 聊天按鈕 */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl z-50 transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-pulse'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </Button>
    </>
  )
}

export default ChatBot
