import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Gallery.css'

const IMAGES_BASE = [
  { src: '/images/gallery-01.png' },
  { src: '/images/gallery-02.png' },
  { src: '/images/gallery-03.png' },
  { src: '/images/gallery-04.png' },
  { src: '/images/gallery-05.png' },
  { src: '/images/gallery-06.png' },
  { src: '/images/gallery-07.png' },
  { src: '/images/gallery-08.png' },
]

export default function Gallery() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200))

  const labels = t('gallery.labels', { returnObjects: true })
  const IMAGES = IMAGES_BASE.map((img, i) => ({
    ...img,
    label: Array.isArray(labels) ? labels[i] : '',
  }))

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0
      setProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isMobile = vw <= 768
  const cardWidth = isMobile ? vw * 0.78 : 420
  const cardGap = isMobile ? 16 : 20
  const trackWidth = IMAGES.length * cardWidth + (IMAGES.length - 1) * cardGap
  const maxShift = Math.max(0, trackWidth - vw + (isMobile ? 40 : 120))
  const shift = progress * maxShift

  return (
    <section ref={sectionRef} id="gallery" className="gal-section">
      <div className="gal-sticky">

        <div className="gal-header">
          <span className="section-eyebrow">{t('gallery.eyebrow')}</span>
          <h2 className="section-title">
            {t('gallery.titleLine1')}<br /><em>{t('gallery.titleEm')}</em>
          </h2>
          <p className="gal-header-sub">{t('gallery.subtitle')}</p>
        </div>

        <div className="gal-viewport">
          <div
            ref={trackRef}
            className="gal-track"
            style={{ transform: `translateX(-${shift}px)` }}
          >
            {IMAGES.map((img, i) => (
              <div key={i} className="gal-item">
                <div className="gal-img-wrap">
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    className="gal-img"
                  />
                </div>
                <div className="gal-item-footer">
                  <span className="gal-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="gal-label">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gal-progress">
          <div className="gal-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>

      </div>
    </section>
  )
}
