import { useState } from 'react'
import { ArrowLeft, CheckCircle, Star, ChevronRight } from 'lucide-react'

const WhatsNew = ({ onBack }) => {
  const [formData, setFormData] = useState({
    needs: [],
    name: '',
    company: '',
    title: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleNeedToggle = (need) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* 頂部導覽 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#c9a84c]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#c9a84c] hover:text-[#e8c96d] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回首頁</span>
          </button>
          <div className="text-center">
            <span className="text-xs tracking-[0.3em] text-[#c9a84c]/70 uppercase">Hanson Management Consulting</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Hero 區塊 */}
      <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1200] to-[#0a0a0a]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          {/* 標籤 */}
          <div className="inline-flex items-center gap-2 border border-[#c9a84c]/40 rounded-full px-5 py-2 mb-8">
            <span className="text-[#c9a84c] text-sm">✦</span>
            <span className="text-[#c9a84c] text-sm tracking-widest uppercase">2026 企業管理升級</span>
            <span className="text-[#c9a84c] text-sm">✦</span>
          </div>

          {/* 副標題 */}
          <p className="text-[#c9a84c]/70 text-sm tracking-widest uppercase mb-4">致 追求組織卓越的領導者</p>

          {/* 主標題 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            您的團隊是在「努力」<br />
            還是在<span className="text-[#c9a84c]">「內耗」</span>？
          </h1>

          {/* 描述 */}
          <p className="text-white/60 text-lg md:text-xl mb-4">
            從要求付出的「努力導向」
          </p>
          <p className="text-white/60 text-lg md:text-xl mb-12">
            轉向精準天賦的「配置導向」
          </p>

          {/* 分隔線 */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#c9a84c]/40" />
            <span className="text-[#c9a84c]/60 text-xs tracking-widest">SEE · DO · BECOME</span>
            <div className="h-px w-16 bg-[#c9a84c]/40" />
          </div>

          {/* 課程名稱 */}
          <p className="text-white/80 text-xl font-semibold mb-2">企業職能三部曲SDB｜實戰公開班</p>
          <p className="text-white/50 text-sm">這不是一堂課，而是一套將「人」轉化為「科學數據」的決策系統</p>

          {/* CTA 按鈕 */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.smartsheet.com/b/form/019d8f994b117dc99aed7b9e759ab753"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a84c] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#e8c96d] transition-all duration-300 hover:scale-105"
            >
              立即報名
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="#sdb"
              onClick={(e) => { e.preventDefault(); document.getElementById('sdb')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 border border-[#c9a84c]/40 text-[#c9a84c] px-8 py-4 rounded-full font-semibold hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* 90% 數據區塊 */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-[#c9a84c]/30 rounded-2xl p-10 bg-gradient-to-br from-[#c9a84c]/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center md:text-left">
                <span className="text-8xl font-bold text-[#c9a84c]">90</span>
                <span className="text-4xl font-bold text-[#c9a84c]">%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">的績效瓶頸，根源於「人才錯置」</h3>
                <p className="text-white/60 leading-relaxed">
                  當 ESG、接班計畫、人才培育投入增加，績效與留任卻沒有同步改善——
                  問題往往不在策略，而在人的「放錯位置」。
                </p>
              </div>
            </div>
          </div>

          {/* 管理升級對比 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center p-6 rounded-xl bg-white/5">
              <p className="text-white/40 text-sm mb-2">管理升級之前</p>
              <p className="text-2xl font-bold text-white/60">努力導向</p>
              <p className="text-white/40 text-sm mt-2">要求員工做得更多</p>
            </div>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                <ChevronRight className="w-6 h-6 text-[#c9a84c]" />
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30">
              <p className="text-[#c9a84c]/70 text-sm mb-2">管理升級之後</p>
              <p className="text-2xl font-bold text-[#c9a84c]">配置導向</p>
              <p className="text-[#c9a84c]/70 text-sm mt-2">把對的人放到對的位置</p>
            </div>
          </div>
        </div>
      </section>

      {/* SDB 三部曲 */}
      <section id="sdb" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c]/60 text-xs tracking-widest uppercase mb-3">The SDB Framework</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">企業職能三部曲</h2>
            <p className="text-white/50">三個維度，系統性翻轉人才價值</p>
          </div>

          <div className="space-y-6">
            {/* STEP 01 - SEE */}
            <div className="border border-white/10 rounded-2xl p-8 hover:border-[#c9a84c]/30 transition-all duration-300 bg-white/[0.02]">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="text-[#c9a84c]/40 text-xs tracking-widest">STEP 01</span>
                  <h3 className="text-4xl font-bold text-[#c9a84c] mt-1">SEE</h3>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-2xl font-bold">看見戰位</h4>
                    <span className="text-white/40 text-sm italic">「停止憑感覺用人！」</span>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    透過 Gallup、Holland Code、WEPSS 等科學工具診斷，找到每個人天賦、興趣與人格的最佳交叉點，精準對齊天賦與績效。
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 02 - DO */}
            <div className="border border-white/10 rounded-2xl p-8 hover:border-[#c9a84c]/30 transition-all duration-300 bg-white/[0.02]">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="text-[#c9a84c]/40 text-xs tracking-widest">STEP 02</span>
                  <h3 className="text-4xl font-bold text-[#c9a84c] mt-1">DO</h3>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-2xl font-bold">落地執行</h4>
                    <span className="text-white/40 text-sm italic">「專注優勢串連！」</span>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    停止補弱點，轉而繪製團隊戰力地圖。將個人優勢串連，共同應對挑戰，創造 1×1=∞ 的乘數效應。
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 03 - BECOME */}
            <div className="border border-white/10 rounded-2xl p-8 hover:border-[#c9a84c]/30 transition-all duration-300 bg-white/[0.02]">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="text-[#c9a84c]/40 text-xs tracking-widest">STEP 03</span>
                  <h3 className="text-4xl font-bold text-[#c9a84c] mt-1">BECOME</h3>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-2xl font-bold">文化內化</h4>
                    <span className="text-white/40 text-sm italic">「打造驅動飛輪！」</span>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    將領導力與戰略思維融入組織 DNA，讓職能匹配成為組織語言與行動，讓高效協作成為自驅文化。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINE 好友限定禮遇 */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-[#c9a84c]/40 rounded-full px-5 py-2 mb-6">
              <span className="text-sm">🎁</span>
              <span className="text-[#c9a84c] text-sm">LINE 好友限定・人才決策升級包</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">現在報名，即刻獲得高階決策專屬禮遇</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: '🔬',
                title: 'Gallup 蓋洛普優勢 Top 5 評測',
                desc: '全球最具公信力的優勢測評工具，精準定位個人天賦戰位'
              },
              {
                icon: '📡',
                title: '個人專屬「職能戰位雷達圖」解析',
                desc: '視覺化呈現您的天賦、興趣與人格交叉優勢圖譜'
              },
              {
                icon: '🎯',
                title: '課後 30 分鐘・一對一高階人才戰略諮詢',
                desc: '由資深顧問為您量身規劃組織人才配置升級路徑'
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#c9a84c]/30 transition-all duration-300">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 引言 */}
          <div className="mt-12 border-l-4 border-[#c9a84c] pl-6 py-2">
            <p className="text-white/70 text-lg italic leading-relaxed">
              「最好的管理，不是讓人更累，而是讓對的人，在對的位置上發揮。」
            </p>
          </div>
        </div>
      </section>

      {/* 報名表單 */}
      <section id="register" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#c9a84c]/60 text-xs tracking-widest uppercase mb-3">立即行動</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">開啟您的組織升級</h2>
            <p className="text-white/50">活動限定・名額有限，額滿即止</p>
          </div>

          {submitted ? (
            <div className="text-center py-16 border border-[#c9a84c]/30 rounded-2xl bg-[#c9a84c]/5">
              <div className="w-16 h-16 bg-[#c9a84c]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#c9a84c]" />
              </div>
              <h3 className="text-2xl font-bold text-[#c9a84c] mb-3">報名成功！</h3>
              <p className="text-white/60">我們將在 24 小時內與您聯繫，確認報名細節。</p>
              <p className="text-white/40 text-sm mt-4">感謝您選擇韓森管理顧問</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 需求選擇 */}
              <div>
                <label className="block text-white/70 text-sm mb-4">我想要……（可複選）</label>
                <div className="space-y-3">
                  {[
                    { value: 'download', label: '📄 下載課程完整大綱（PDF）' },
                    { value: 'register', label: '🏆 報名參加實戰公開班' },
                    { value: 'consult', label: '☕ 專人聯繫，討論企業內訓需求' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        formData.needs.includes(option.value)
                          ? 'border-[#c9a84c] bg-[#c9a84c]/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.needs.includes(option.value)}
                        onChange={() => handleNeedToggle(option.value)}
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        formData.needs.includes(option.value) ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-white/30'
                      }`}>
                        {formData.needs.includes(option.value) && (
                          <CheckCircle className="w-3 h-3 text-black" />
                        )}
                      </div>
                      <span className="text-white/80">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 表單欄位 */}
              {[
                { key: 'name', label: '姓名 *', placeholder: '請輸入您的姓名', required: true },
                { key: 'company', label: '公司名稱 *', placeholder: '請輸入公司全名', required: true },
                { key: 'title', label: '職稱 *', placeholder: '例：HR Director／總經理／營運長', required: true },
                { key: 'phone', label: '聯絡手機 *', placeholder: '09XX-XXX-XXX', required: true }
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-white/70 text-sm mb-2">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.key]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/50 focus:bg-white/[0.08] transition-all duration-200"
                  />
                </div>
              ))}

              {/* 提交按鈕 */}
              <button
                type="submit"
                className="w-full bg-[#c9a84c] text-black py-4 rounded-xl font-bold text-lg hover:bg-[#e8c96d] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                立即下載大綱並預約報名 →
              </button>

              <p className="text-center text-white/30 text-xs">
                提交即代表您同意我們的隱私政策，我們絕不濫用您的個人資訊
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#c9a84c] font-semibold mb-2">韓森管理顧問有限公司</p>
          <p className="text-white/40 text-sm mb-6">Hanson Management Consulting</p>
          <div className="flex justify-center gap-6 text-white/40 text-sm">
            <span>hanson.lin@hansondm.com</span>
            <span>|</span>
            <span>+886-982-899889</span>
          </div>
          <p className="text-white/20 text-xs mt-6">© 2026 韓森管理顧問有限公司. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default WhatsNew
