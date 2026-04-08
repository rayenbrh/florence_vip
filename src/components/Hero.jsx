import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingScreen from './LoadingScreen'
import './Hero.css'

const TOTAL_FRAMES = 192
const FRAME_PATH = (n) => `/frames/v1/ezgif-frame-${String(n).padStart(3, '0')}.jpg`

export default function Hero() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const frames = useRef([])
  const loadedCount = useRef(0)
  const currentFrameIdx = useRef(0)
  const rafRef = useRef(null)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const drawFrame = useCallback((img) => {
    const canvas = canvasRef.current
    if (!canvas || !img || !img.naturalWidth) return
    const ctx = canvas.getContext('2d')
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    const x = (canvas.width - w) / 2
    const y = (canvas.height - h) / 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, w, h)
  }, [])

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const f = frames.current[currentFrameIdx.current]
      if (f?.complete) drawFrame(f)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    const onOrient = () => setTimeout(resize, 250)
    window.addEventListener('orientationchange', onOrient, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', onOrient)
    }
  }, [drawFrame])

  useEffect(() => {
    frames.current = new Array(TOTAL_FRAMES)

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)

      const onDone = () => {
        loadedCount.current++
        const pct = (loadedCount.current / TOTAL_FRAMES) * 100
        setLoadProgress(pct)
        if (i === 1 && img.complete) drawFrame(img)
        if (loadedCount.current >= TOTAL_FRAMES) setIsLoaded(true)
      }

      img.onload = onDone
      img.onerror = onDone
      frames.current[i - 1] = img
    }
  }, [drawFrame])

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const scrolled = -hero.getBoundingClientRect().top
      const total = hero.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / total))
      setScrollProgress(progress)

      const idx = Math.round(progress * (TOTAL_FRAMES - 1))
      if (idx !== currentFrameIdx.current) {
        currentFrameIdx.current = idx
        const frame = frames.current[idx]
        if (frame?.complete) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => drawFrame(frame))
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrame])

  const p = scrollProgress

  const l1 = p < 0.2 ? 1 : p < 0.25 ? 1 - (p - 0.2) / 0.05 : 0
  const l2 = p < 0.28 ? 0 : p < 0.33 ? (p - 0.28) / 0.05 : p < 0.5 ? 1 : p < 0.55 ? 1 - (p - 0.5) / 0.05 : 0
  const l3 = p < 0.65 ? 0 : p < 0.72 ? (p - 0.65) / 0.07 : 1

  const activeLayer = l1 > 0.5 ? 1 : l2 > 0.5 ? 2 : 3
  const scrollIndicatorOpacity = p < 0.06 ? 1 - (p / 0.06) : 0

  const layerStyle = (opacity, ty = 0) => ({
    opacity,
    ['--layer-ty']: `${ty}px`,
    pointerEvents: opacity > 0.1 ? 'auto' : 'none',
    willChange: 'opacity, transform',
  })

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      <section id="hero" ref={heroRef} className="hero-section">
        <div className="hero-sticky">

          <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />

          <div className="hero-layer hero-layer--center" style={layerStyle(l1, (1 - l1) * -28)}>
            <span className="eyebrow" aria-label={t('hero.eyebrow')}>{t('hero.eyebrow')}</span>
            <h1 className="hero-h1">
              {t('hero.layer1a')}<br />
              {t('hero.layer1b')}<br />
              <em>{t('hero.layer1em')}</em>
            </h1>
            <p className="hero-sub">{t('hero.layer1sub')}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">200</span><span className="hero-stat-label">{t('hero.statSqm')}</span></div>
              <div className="hero-stat-divider" />
              <div className="hero-stat"><span className="hero-stat-num">3</span><span className="hero-stat-label">{t('hero.statBedrooms')}</span></div>
              <div className="hero-stat-divider" />
              <div className="hero-stat"><span className="hero-stat-num">6</span><span className="hero-stat-label">{t('hero.statGuests')}</span></div>
            </div>
          </div>

          <div className="hero-layer hero-layer--left" style={layerStyle(l2, l2 === 0 ? 20 : 0)}>
            <h2 className="hero-h1 hero-h1--normal">
              {t('hero.layer2a')}<br />
              {t('hero.layer2b')}<br />
              <em>{t('hero.layer2em')}</em>
            </h2>
            <p className="hero-sub hero-sub--gold">{t('hero.layer2sub')}</p>
          </div>

          <div className="hero-layer hero-layer--center" style={layerStyle(l3, (1 - l3) * 22)}>
            <h2 className="hero-h1">
              {t('hero.layer3a')}<br />
              {t('hero.layer3b')}<br />
              <em>{t('hero.layer3em')}</em>
            </h2>
            <a href="#contact" className="hero-cta">{t('hero.cta')}</a>
            <p className="hero-cta-note">{t('hero.ctaNote')}</p>
          </div>

          <div className="scroll-ind" style={{ opacity: scrollIndicatorOpacity }} aria-hidden="true">
            <div className="scroll-line" />
            <span className="scroll-label">{t('hero.scroll')}</span>
          </div>

          <div className="hero-meta" aria-hidden="true">
            <span className="meta-brand">◆ Florence VIP</span>
            <div className="meta-progress">
              <span className={`meta-dot ${activeLayer === 1 ? 'meta-dot--on' : ''}`} />
              <span className="meta-line" />
              <span className={`meta-dot ${activeLayer === 2 ? 'meta-dot--on' : ''}`} />
              <span className="meta-line" />
              <span className={`meta-dot ${activeLayer === 3 ? 'meta-dot--on' : ''}`} />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
