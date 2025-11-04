import { useNavigate } from 'react-router-dom'
import './home.css'
import kakaotalkImg from '../assets/kakaotalk.png'
import posterImg from '../assets/poster.png'
import girlMing from '../assets/girl-ming.png'
import boySu from '../assets/boy-su.png'
import house from '../assets/house.png'


export default function HomePage() {
  const nav = useNavigate()
  return (
    <div className="page page--home" >
      <div style={{height: 100}}/>
      <p>어쩌다 이렇게 된 걸까요?</p>
      <p>그건 아마도..</p>
      <img src={kakaotalkImg} alt="카카오톡" style={{ width: '100%', height: 'auto' }} loading="lazy" />
      <p>생각치도 못한 카톡 한 통에서 시작되었던 거에요</p>
      <div className="vertical-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
   
      <div className="flex-col-center">
        {'<지금 시작합니다>'}
        <img src={posterImg} alt="환연포스터" style={{ width: '100%', height: 'auto' }} loading="lazy" />
      </div>

      <div style={{textAlign: 'center' ,}} className="flex-col-center">
        환승연애 시즌 ∞ !<br/> 새로운 하우스에 입주가 시작되었습니다
        <img src={house} alt="환연하우스" style={{ width: '100%', height: 'auto' }} loading="lazy" />
      </div>
       
      <div className="flex-col-center">
        첫 번째 입주자, 박민경
        <img src={girlMing} alt="박밍공" style={{ width: '100%', height: 'auto' }} loading="lazy" />
      </div>

      <div className="flex-col-center">
        두 번째 입주자, 임수철
        <img src={boySu} alt="임수철" style={{ width: '100%', height: 'auto' }} loading="lazy" />
      </div>
      
      <p>~~어쩌구 저쩌구 게임도 있답니다~~</p>
      <div className="cta">
        <button onClick={() => nav('/game')}>게임 시작</button>
      </div>
    </div>
  )
}
