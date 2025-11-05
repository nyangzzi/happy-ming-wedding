import { useNavigate } from 'react-router-dom'
import './home.css'
import kakaotalkImg from '../assets/kakaotalk.png'
import posterImg from '../assets/poster.png'
import girlMing from '../assets/girl-ming.png'
import boySu from '../assets/boy-su.png'
import house from '../assets/house.png'
import periodImg from '../assets/period.png'
import waitingImg from '../assets/waiting.png'
import selectedXImg from '../assets/selected_x.png'
import dontCryingImg from '../assets/dont-crying.png'
import cuteMingImg from '../assets/cute-ming.png'
import firstLoveImg from '../assets/first-love.png'
import goodSuImg from '../assets/good-su.png'
import goodMingImg from '../assets/good-ming.png'
import purposeSuImg from '../assets/purpose-su.png'
import purposeMingImg from '../assets/purpose-ming.png'
import resultSuImg from '../assets/result-su.png'
import resultMingImg from '../assets/result-ming.png'
import nowSuMingImg from '../assets/now-su-ming.png'
import weddingPosterImg from '../assets/wedding-poster.png'
import mapImg from '../assets/map.png'


export default function HomePage() {
  const nav = useNavigate()
  return (
    <div className="page page--home">
      <div style={{ height: 100 }} />
      <div>
        어쩌다 이렇게 된 걸까요?
        <br />
        그건 아마도..
      </div>
      <div>
        <img src={kakaotalkImg} alt="카카오톡" loading="lazy" />
      </div>
      <div>
        {'생각치도 못한 카톡 한 통에서 시작되었던 거에요'}
      </div>
      <div className="vertical-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>

      <div>
        {'지금 시작합니다!'}
        <img src={posterImg} alt="환연포스터" loading="lazy" />
      </div>

      <div>
        수군수군....👥👥👤👥
        <br />
        웅성웅성👤👤👤👤👥
      </div>


      <div>
        <img src={house} alt="환연하우스" loading="lazy" />
        ???:  환승연애 시즌 ∞ !<br /> 새로운 하우스에 입주가 시작되었습니다
      </div>

      <div>
        <img src={girlMing} alt="박밍공" loading="lazy" />
        첫 번째 입주자, 박민경
      </div>

      <div>

        <img src={boySu} alt="임수철" loading="lazy" />
        두 번째 입주자, 임수철
      </div>

      <div>
        <img src={periodImg} alt="기간" loading="lazy" />
        진짜 우리 22살x28살에 만났는데,
        <br />
        28살x34살이햐~
      </div>

      <div>
        <img src={selectedXImg} alt='선택~' loading='lazy' style={{ width: '60%' }} />
        <img src={waitingImg} alt='기다려' loading='lazy' />
        6년만의 재회❤️‍🩹
      </div>

      <div>
        <img src={dontCryingImg} alt='울지마~~' loading='lazy' />
        그동안 민경의 소식을 기다려 온 수철💌
      </div>

      <div>
        <img src={cuteMingImg} alt='부끄밍' loading='lazy' />
        아무렇지 않을 줄 알았는데...🤭
      </div>

      <div>
        <img src={firstLoveImg} alt='첫사랑' loading='lazy' />
        잊고 있던 추억이 떠올랐어요
      </div>

      <div>
        <img src={goodSuImg} alt='한결수철' loading='lazy' />
        그의 한결 같은 마음
      </div>

      <div>
        <img src={goodMingImg} alt='한결밍경' loading='lazy' />
        그리고 그녀의 흔들리는 마음
      </div>

      <div>
        <img src={purposeSuImg} alt='결심수철' loading='lazy' />
        그래 결심했어!! 💪
      </div>

      <div>
        <img src={purposeMingImg} alt='결심밍경' loading='lazy' />
        이 사람과 평생 함께 하는 거야! 👩‍❤️‍👨
      </div>

      <div>
        <img src={resultSuImg} alt='최종선택수' loading='lazy' />
      </div>

      <div>
        <img src={resultMingImg} alt='최종선택밍' loading='lazy' />
      </div>

      <div>
        그리고 지금,
        <img src={nowSuMingImg} alt='그리고지금' loading='lazy' />
      </div>

      <div>
        저희, 결혼합니다!!💐
        <img src={weddingPosterImg} alt='딴따라란~' loading='lazy' />
      </div>

      <div>
        여기에 넣고 싶은 말 있어여?!?!!!
        <img src={mapImg} alt='약도' loading='lazy' />
      </div>

      <div className="cta">
        <button onClick={() => nav('/game')}>게임 시작</button>
      </div>

      <div style={{ height: 100 }} />

    </div>
  )
}
