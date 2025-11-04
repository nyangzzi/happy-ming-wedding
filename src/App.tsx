import { useState } from 'react'
import './App.css'

export default function App() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className="invitation">
      {!isOpened ? (
        <div className="cover">
          <h1 className="title">💍 Happy Ming Wedding 💐</h1>
          <p className="subtitle">2025. 11. 16 | Bundang</p>
          <button onClick={() => setIsOpened(true)}>초대장 열기 💌</button>
        </div>
      ) : (
        <div className="content">
          <h2>👰‍♀️ 민경 & 🕴️ 수철, 결혼합니다</h2>
          <p>
            두 사람이 만나 사랑을 약속하고,
            <br />
            새로운 인생을 함께하려 합니다.
          </p>
          <p className="date">📅 2025년 11월 16일 일요일 오후 12시 10분</p>
          <p className="place">📍 더 바실리움</p>
          <button onClick={() => setIsOpened(false)}>돌아가기 ↩️</button>
        </div>
      )}
    </div>
  )
}
