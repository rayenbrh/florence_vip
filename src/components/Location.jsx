import { useTranslation } from 'react-i18next'
import './Location.css'

export default function Location() {
  const { t } = useTranslation()
  const nearby = t('location.nearby', { returnObjects: true })

  return (
    <section id="location" className="location">
      <div className="location-inner">
        <div className="location-content">
          <span className="section-eyebrow">{t('location.eyebrow')}</span>
          <h2 className="section-title">{t('location.title')}</h2>
          <div className="about-divider" style={{ marginBottom: '28px' }} />
          <p className="about-body">{t('location.body')}</p>
          <div className="location-nearby">
            {Array.isArray(nearby) && nearby.map((row, i) => {
              const place = row[0]
              const dist = row[1]
              return (
                <div key={i} className="nearby-item">
                  <span className="nearby-icon" aria-hidden="true">◆</span>
                  <span className="nearby-place">{place}</span>
                  <span className="nearby-dist">{dist}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="location-img">
          <img
            src="/images/gallery-08.png"
            alt=""
            loading="lazy"
          />
          <div className="location-img-label">{t('location.imgLabel')}</div>
        </div>
      </div>
    </section>
  )
}
