import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './game.css'

const BRIDE_EMOJI = '👰‍♀️'
const GROOM_EMOJI = '🤵‍♂️'
const OBSTACLE_EMOJIS = ['💸', '💣', '💔', '🔥']
const HEART_EMOJI = '❤️'
const BASKET_EMOJI = '🧺'

const GAME_WIDTH = 375
const GAME_HEIGHT = 600
const GROOM_WIDTH = 50
const EMOJI_SIZE = 30

const START_DATE = new Date('2023-08-15')

interface Emoji {
  id: number
  char: string
  x: number
  y: number
  speed: number
  type: 'bride' | 'obstacle' | 'heart'
}

interface FloatingText {
  id: number
  text: string
  x: number
  y: number
  createdAt: number
}

export default function GamePage() {
  const nav = useNavigate()
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [emojis, setEmojis] = useState<Emoji[]>([])
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([])

  const groomXRef = useRef(GAME_WIDTH / 2 - GROOM_WIDTH / 2)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const lastEmojiTimeRef = useRef(0)
  const lastCollisionTimeRef = useRef(0) // 충돌 시간 기록을 위한 ref

  const getTargetScore = () => {
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - START_DATE.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const targetScore = getTargetScore()

  const startGame = () => {
    setScore(0)
    setLives(5)
    setEmojis([])
    setFloatingTexts([])
    setGameState('playing')
    lastEmojiTimeRef.current = 0
  }

  const resetGame = () => {
    setGameState('idle')
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const newX = e.clientX - rect.left - GROOM_WIDTH / 2
    groomXRef.current = Math.max(0, Math.min(newX, GAME_WIDTH - GROOM_WIDTH))
    gameAreaRef.current.querySelector('.groom')!.setAttribute('style', `left: ${groomXRef.current}px; width: ${GROOM_WIDTH}px`)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const newX = e.touches[0].clientX - rect.left - GROOM_WIDTH / 2
    groomXRef.current = Math.max(0, Math.min(newX, GAME_WIDTH - GROOM_WIDTH))
    gameAreaRef.current.querySelector('.groom')!.setAttribute('style', `left: ${groomXRef.current}px; width: ${GROOM_WIDTH}px`)
  }

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      // 1. Create new emojis
      if (timestamp - lastEmojiTimeRef.current > 500) {
        lastEmojiTimeRef.current = timestamp
        const newEmoji: Emoji = {
          id: Date.now(),
          x: Math.random() * (GAME_WIDTH - EMOJI_SIZE),
          y: -EMOJI_SIZE,
          speed: 1 + Math.random() * 1.5,
          char: '',
          type: 'obstacle', // 기본값
        }

        const rand = Math.random()
        if (rand < 0.05) {
          // 5% 확률로 하트
          newEmoji.char = HEART_EMOJI
          newEmoji.type = 'heart'
        } else if (rand < 0.35) {
          // 30% 확률로 신부 (0.05 ~ 0.35)
          newEmoji.char = BRIDE_EMOJI
          newEmoji.type = 'bride'
        } else {
          // 나머지 확률로 장애물
          newEmoji.char = OBSTACLE_EMOJIS[Math.floor(Math.random() * OBSTACLE_EMOJIS.length)]
          newEmoji.type = 'obstacle'
        }
        setEmojis((prev) => [...prev, newEmoji])
      }

      // 2. Move emojis and check for collisions
      setEmojis((currentEmojis) => {
        let scoreDelta = 0
        let livesDelta = 0
        const newFloatingTexts: FloatingText[] = []

        const updatedEmojis = currentEmojis.filter((emoji) => {
          const newY = emoji.y + emoji.speed
          // Collision detection
          const groomRect = { x: groomXRef.current, y: GAME_HEIGHT - 50, width: GROOM_WIDTH, height: 30 }
          const emojiRect = { x: emoji.x, y: newY, width: EMOJI_SIZE, height: EMOJI_SIZE }

          if (
            emojiRect.x < groomRect.x + groomRect.width &&
            emojiRect.x + emojiRect.width > groomRect.x &&
            emojiRect.y < groomRect.y + groomRect.height &&
            emojiRect.y + emojiRect.height > groomRect.y
          ) {
            // 충돌 후 200ms 동안은 새로운 충돌을 무시 (무적 시간)
            if (timestamp - lastCollisionTimeRef.current < 200) {
              return false // 충돌 처리 없이 이모지 제거
            }
            lastCollisionTimeRef.current = timestamp
            if (emoji.type === 'bride') {
              const points = Math.floor(Math.random() * 10) + 1
              scoreDelta += points
              newFloatingTexts.push({
                id: emoji.id,
                text: `+${points}`,
                x: groomXRef.current + GROOM_WIDTH / 2,
                y: GAME_HEIGHT - 70,
                createdAt: timestamp,
              })
            } else if (emoji.type === 'heart') {
              livesDelta += 1
              newFloatingTexts.push({
                id: emoji.id,
                text: '+❤️',
                x: groomXRef.current + GROOM_WIDTH / 2,
                y: GAME_HEIGHT - 70,
                createdAt: timestamp,
              })
            } else {
              livesDelta -= 1
              newFloatingTexts.push({
                id: emoji.id,
                text: '💥',
                x: groomXRef.current + GROOM_WIDTH / 2,
                y: GAME_HEIGHT - 70,
                createdAt: timestamp,
              })
            }
            return false
          } else if (newY < GAME_HEIGHT) {
            emoji.y = newY
            return true
          }
          return false
        })

        if (scoreDelta !== 0) {
          setScore((s) => s + scoreDelta)
        }
        if (livesDelta !== 0) {
          setLives((l) => Math.min(5, Math.max(0, l + livesDelta)))
        }
        if (newFloatingTexts.length > 0) {
          setFloatingTexts((ft) => [...ft, ...newFloatingTexts])
        }
        return updatedEmojis
      })

      // 2.5. Remove old floating texts
      setFloatingTexts((prev) => {
        return prev.filter((ft) => timestamp - ft.createdAt < 1000)
      })

      requestRef.current = requestAnimationFrame(gameLoop)
    }

    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop)
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
    }
  }, [gameState])

  // Check for win/loss conditions whenever score or lives change
  useEffect(() => {
    if (gameState !== 'playing') return
    if (lives <= 0) {
      setGameState('lost')
    } else if (score >= targetScore) {
      setGameState('won')
    }
  }, [score, lives, targetScore, gameState])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      if (e.key === 'ArrowLeft') {
        groomXRef.current = Math.max(0, groomXRef.current - 30)
        gameAreaRef.current?.querySelector('.groom')!.setAttribute('style', `left: ${groomXRef.current}px; width: ${GROOM_WIDTH}px`)
      } else if (e.key === 'ArrowRight') {
        groomXRef.current = Math.min(GAME_WIDTH - GROOM_WIDTH, groomXRef.current + 30)
        gameAreaRef.current?.querySelector('.groom')!.setAttribute('style', `left: ${groomXRef.current}px; width: ${GROOM_WIDTH}px`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameState])

  const renderGameState = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="game-intro">
            <h2>신랑 밍을 도와 신부 밍을 찾아주세요!</h2>
            <p>하늘에서 떨어지는 신부를 바구니로 받으면 점수를 얻어요.</p>
            <p>
              목표 점수: <strong>{targetScore}점</strong> (우리 D+{targetScore})
            </p>
            <p>다른 이모지를 받으면 목숨이 하나 줄어들어요. (총 3개)</p>
            <button onClick={startGame} className="game-button">
              게임 시작 🎮
            </button>
            <button onClick={() => nav('/')} className="game-button secondary">
              홈으로
            </button>
          </div>
        )
      case 'won':
        return (
          <div className="game-over won">
            <div className="confetti"></div>
            <h2>결혼 성공!</h2>
            <p>최종 점수: {score}점</p>
            <div className="animation-character">🎉🤵‍♂️👰‍♀️🎉</div>
            <p>두 사람은 행복하게 살았답니다!</p>
            <button onClick={startGame} className="game-button">
              다시 도전
            </button>
            <button onClick={() => nav('/')} className="game-button secondary">
              홈으로
            </button>
          </div>
        )
      case 'lost':
        return (
          <div className="game-over lost">
            <h2>결혼 실패...</h2>
            <p>최종 점수: {score}점</p>
            <div className="animation-character crying">😭🤵‍♂️</div>
            <p>신부를 놓치다니... 다시 한번 기회를 주세요!</p>
            <button onClick={startGame} className="game-button">
              재시도
            </button>
            <button onClick={() => nav('/')} className="game-button secondary">
              홈으로
            </button>
          </div>
        )
      case 'playing':
        return (
          <>
            <div className="game-stats">
              <span>
                목숨: {'❤️'.repeat(lives)}
                {'🤍'.repeat(Math.max(0, 5 - lives))}
              </span>
              <span>
                결혼까지 D-{Math.max(0, targetScore - score)}
              </span>
            </div>
            <div
              className="game-area"
              ref={gameAreaRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            >
              <div className="groom" style={{ left: groomXRef.current, width: GROOM_WIDTH }}>
                <span className="groom-basket">{BASKET_EMOJI}</span>
                <span className="groom-char">{GROOM_EMOJI}</span>
              </div>
              {emojis.map((emoji) => (
                <div
                  key={emoji.id}
                  className="emoji"
                  style={{ left: emoji.x, top: emoji.y, fontSize: EMOJI_SIZE }}
                >
                  {emoji.char}
                </div>
              ))}
              {floatingTexts.map((ft) => (
                <div
                  key={ft.id}
                  className="floating-text"
                  style={{
                    left: ft.x,
                    top: ft.y,
                  }}
                >
                  {ft.text}
                </div>
              ))}
            </div>
          </>
        )
    }
  }

  return <div className="page page--center page--game">{renderGameState()}</div>
}