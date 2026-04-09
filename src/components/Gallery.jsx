import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './Gallery.css'

const IMAGES_BASE = [
  { src: '/images/gallery-01.webp' },
  { src: '/images/gallery-02.webp' },
  { src: '/images/gallery-03.webp' },
  { src: '/images/gallery-04.webp' },
  { src: '/images/gallery-05.webp' },
  { src: '/images/gallery-06.webp' },
  { src: '/images/gallery-07.webp' },
  { src: '/images/gallery-08.webp' },
]

export default function Gallery() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressFillRef = useRef(null)
  const rafRef = useRef(null)
  const maxShiftRef = useRef(0)

  const labels = t('gallery.labels', { returnObjects: true })
  const IMAGES = IMAGES_BASE.map((img, i) => ({
    ...img,
    label: Array.isArray(labels) ? labels[i] : '',
  }))

  useEffect(() => {
    const n = IMAGES_BASE.length

    const syncShiftFromScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0
      const shift = p * maxShiftRef.current
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${shift}px)`
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${p * 100}%`
      }
    }

    const isMobile = window.innerWidth <= 768
    const cardWidth = isMobile ? window.innerWidth * 0.78 : 420
    const cardGap = isMobile ? 16 : 20
    const trackWidth = n * cardWidth + (n - 1) * cardGap
    maxShiftRef.current = Math.max(0, trackWidth - window.innerWidth + (isMobile ? 40 : 120))

    const onResize = () => {
      const mob = window.innerWidth <= 768
      const cw = mob ? window.innerWidth * 0.78 : 420
      const cg = mob ? 16 : 20
      const tw = n * cw + (n - 1) * cg
      maxShiftRef.current = Math.max(0, tw - window.innerWidth + (mob ? 40 : 120))
      syncShiftFromScroll()
    }

    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return

        const rect = section.getBoundingClientRect()
        const total = section.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0

        const shift = p * maxShiftRef.current

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${shift}px)`
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${p * 100}%`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

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
            style={{ transform: 'translateX(0)' }}
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
          <div ref={progressFillRef} className="gal-progress-fill" style={{ width: '0%' }} />
        </div>

      </div>
    </section>
  )
}
