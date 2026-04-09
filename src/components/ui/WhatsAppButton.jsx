import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT } from '../../config/contact'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const { t } = useTranslation()

  const message = t('whatsapp.message')
  const whatsappUrl =
    `https://wa.me/${CONTACT.whatsappNumber}` +
    (message ? `?text=${encodeURIComponent(message)}` : '')

  return (
    <div
      className={`wa-wrap ${hovered ? 'wa-wrap--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`wa-tooltip ${hovered ? 'wa-tooltip--show' : ''}`} role="tooltip">
        {t('whatsapp.tooltip')}
        <span className="wa-tooltip-arrow" aria-hidden="true" />
      </div>

      <div className="wa-btn-wrap">
        <div className="wa-pulse" aria-hidden="true" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`wa-btn wa-link ${hovered ? 'wa-btn--expanded' : ''}`}
          aria-label={t('whatsapp.ariaLabel')}
        >
          <svg
            className="wa-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.849L.057 23.617a.75.75 0 00.92.919l5.919-1.55A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.373-.217-3.867 1.013 1.013-3.773-.233-.387A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>

          <span className={`wa-label ${hovered ? 'wa-label--show' : ''}`}>
            {t('whatsapp.brand')}
          </span>
        </a>
      </div>
    </div>
  )
}
