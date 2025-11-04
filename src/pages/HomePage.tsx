import { useNavigate } from 'react-router-dom'
import './home.css'

export default function HomePage() {
  const nav = useNavigate()
  return (
    <div className="page page--home">
      <h1 className="title">💍 Happy Ming Wedding 💐</h1>
      <p className="sub">초대장을 열고, 결혼 미니게임도 해보세요!</p>
      <div className="cta">
        <button onClick={() => nav('/game')}>게임 시작 🎮</button>
      </div>
    </div>
  )
}
