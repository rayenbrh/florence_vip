import { useTranslation } from 'react-i18next'
import './Rooms.css'

export default function Rooms() {
  const { t } = useTranslation()
  const roomsData = t('rooms.rooms', { returnObjects: true })
  const ROOMS = [
    { ...roomsData[0], num: '01', img: '/images/Gemini_Generated_Image_mh2f9zmh2f9zmh2f.png' },
    { ...roomsData[1], num: '02', img: '/images/Gemini_Generated_Image_1krw6y1krw6y1krw.png' },
    { ...roomsData[2], num: '03', img: '/images/Gemini_Generated_Image_d1shvqd1shvqd1sh.png' },
  ]

  return (
    <section id="rooms" className="rooms">
      <div className="rooms-inner">
        <div className="rooms-header">
          <span className="section-eyebrow">{t('rooms.eyebrow')}</span>
          <h2 className="section-title">
            {t('rooms.titleLine')}<br /><em>{t('rooms.titleEm')}</em>
          </h2>
        </div>
        <div className="rooms-list">
          {ROOMS.map((r, i) => (
            <div key={i} className="room-item">
              <div className="room-img">
                <img src={r.img} alt={`${r.name} — Florence VIP`} loading="lazy" />
              </div>
              <div className="room-content">
                <span className="room-num">{r.num}</span>
                <h3 className="room-name">{r.name}</h3>
                <div className="room-divider" />
                <p className="room-desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
