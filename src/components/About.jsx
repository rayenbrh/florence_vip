import { useTranslation } from 'react-i18next'
import './About.css'

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="about">
      <div className="about-inner">

        <div className="about-left">
          <span className="section-eyebrow">{t('about.eyebrow')}</span>
          <h2 className="section-title">
            {t('about.titleLine')}<br />
            <em>{t('about.titleEm')}</em>
          </h2>
          <div className="about-divider" />
          <p className="about-body">{t('about.p1')}</p>
          <p className="about-body">{t('about.p2')}</p>
          <p className="about-body">{t('about.p3')}</p>
          <a href="#contact" className="about-cta">{t('about.cta')}</a>
        </div>

        <div className="about-right">
          <div className="about-img-main">
            <img src="/images/about-01.png" alt="" loading="lazy" />
          </div>
          <div className="about-img-secondary">
            <img src="/images/about-02.png" alt="" loading="lazy" />
          </div>
          <div className="about-facts">
            <div className="about-fact">
              <span className="fact-num">200</span>
              <span className="fact-label">{t('about.statSqm')}</span>
            </div>
            <div className="about-fact">
              <span className="fact-num">4<sup>th</sup></span>
              <span className="fact-label">{t('about.statFloor')}</span>
            </div>
            <div className="about-fact">
              <span className="fact-num">5.0</span>
              <span className="fact-label">{t('about.statRating')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
