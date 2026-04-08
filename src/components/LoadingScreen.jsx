import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './LoadingScreen.css'

export default function LoadingScreen({ progress, isComplete }) {
  const { t } = useTranslation()
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (isComplete) {
      const t1 = setTimeout(() => setExiting(true), 400)
      const t2 = setTimeout(() => setGone(true), 1800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [isComplete])

  if (gone) return null

  const pct = Math.min(100, Math.round(progress))

  return (
    <div className={`ls ${exiting ? 'ls--exit' : ''}`} role="status" aria-label="Loading Florence VIP">

      <span className="ls-corner ls-corner--tl" aria-hidden="true" />
      <span className="ls-corner ls-corner--tr" aria-hidden="true" />
      <span className="ls-corner ls-corner--bl" aria-hidden="true" />
      <span className="ls-corner ls-corner--br" aria-hidden="true" />

      <div className="ls-center">
        <div className="ls-diamond" aria-hidden="true">◆</div>
        <h1 className="ls-title">Florence VIP</h1>
        <p className="ls-sub">{t('loading.tagline')}</p>

        <div className="ls-track" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
          <div className="ls-fill" style={{ width: `${pct}%` }} />
        </div>

        <p className="ls-pct">{pct}%</p>
      </div>

      <p className="ls-bottom">
        {pct < 100 ? t('loading.preparing') : t('loading.welcome')}
      </p>

    </div>
  )
}
