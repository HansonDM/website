import React from 'react'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue' }}>韓森管理顧問測試頁面</h1>
      <p>如果您看到這個頁面，表示 React 應用正常運作。</p>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h2>測試內容</h2>
        <ul>
          <li>React 載入成功</li>
          <li>JavaScript 執行正常</li>
          <li>CSS 樣式生效</li>
        </ul>
      </div>
      <button 
        onClick={() => alert('按鈕功能正常！')}
        style={{ 
          backgroundColor: '#007bff', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        測試按鈕
      </button>
    </div>
  )
}

export default App
