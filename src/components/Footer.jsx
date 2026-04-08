import { useTranslation } from 'react-i18next'
import { CONTACT } from '../config/contact'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(t('whatsapp.message'))}`

  return (
    <footer id="contact" className="footer">
      <div className="footer-cta">
        <div className="footer-cta-bg" aria-hidden="true" />
        <div className="footer-cta-content">
          <span className="section-eyebrow" style={{ textAlign: 'center', display: 'block' }}>{t('footer.eyebrow')}</span>
          <h2 className="footer-cta-title">
            {t('footer.titleLine')}<br /><em>{t('footer.titleEm')}</em>
          </h2>
          <p className="footer-cta-sub">{t('footer.sub')}</p>
          <div className="footer-cta-actions">
            <a href="mailto:info@florencevip.com" className="footer-btn footer-btn--gold">{t('footer.ctaPrimary')}</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="footer-btn footer-btn--outline">{t('footer.ctaSecondary')}</a>
          </div>
          <div className="footer-host">
            <div className="footer-host-badge">
              <span className="host-stars">★★★★★</span>
              <span className="host-rating">{t('footer.hostRating')}</span>
            </div>
            <p className="footer-host-note">{t('footer.hostNote')}</p>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <span className="footer-logo">◆ Florence VIP</span>
        <p className="footer-legal">
          {t('footer.legal')} · {t('footer.legalExtra')} · © {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a href="https://www.airbnb.it/rooms/1551410081009156511" target="_blank" rel="noopener noreferrer" className="footer-link">{t('footer.airbnb')}</a>
        </div>
      </div>
    </footer>
  )
}
