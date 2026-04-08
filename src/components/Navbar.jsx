import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import './Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isIT = i18n.language?.startsWith('it')
  const toggleLang = () => i18n.changeLanguage(isIT ? 'en' : 'it')

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const navClass = [
    'nav',
    scrolled ? 'nav--scrolled' : '',
    menuOpen ? 'nav--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className="nav__top">
        <a
          href="#hero"
          className="nav-logo"
          aria-label="Florence VIP home"
          onClick={() => menuOpen && setMenuOpen(false)}
        >
          <span className="nav-diamond" aria-hidden="true">◆</span>
          <span className="nav-brand">Florence VIP</span>
        </a>

        <ul className="nav-links" role="list">
          <li><a href="#about" className="nav-link">{t('nav.residence')}</a></li>
          <li><a href="#gallery" className="nav-link">{t('nav.gallery')}</a></li>
          <li><a href="#rooms" className="nav-link">{t('nav.rooms')}</a></li>
          <li><a href="#location" className="nav-link">{t('nav.location')}</a></li>
        </ul>

        <button
          type="button"
          className="lang-toggle nav-lang-desktop"
          onClick={toggleLang}
          aria-label={isIT ? t('nav.langSwitchToEN') : t('nav.langSwitchToIT')}
        >
          {isIT ? 'EN' : 'IT'}
        </button>

        <a href="#contact" className="nav-cta">{t('nav.cta')}</a>

        <button
          type="button"
          className={`nav-burger ${menuOpen ? 'nav-burger--open' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            toggleMenu()
          }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-panel"
        >
          <span /><span /><span />
        </button>
      </div>

      <button
        type="button"
        className={`nav-backdrop ${menuOpen ? 'nav-backdrop--visible' : ''}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <div
        id="nav-mobile-panel"
        className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          <li><a href="#about" className="nav-drawer-link" onClick={closeMenu}>{t('nav.residence')}</a></li>
          <li><a href="#gallery" className="nav-drawer-link" onClick={closeMenu}>{t('nav.gallery')}</a></li>
          <li><a href="#rooms" className="nav-drawer-link" onClick={closeMenu}>{t('nav.rooms')}</a></li>
          <li><a href="#location" className="nav-drawer-link" onClick={closeMenu}>{t('nav.location')}</a></li>
        </ul>
        <button
          type="button"
          className="lang-toggle nav-lang-mobile"
          onClick={toggleLang}
          aria-label={isIT ? t('nav.langSwitchToEN') : t('nav.langSwitchToIT')}
        >
          {isIT ? 'EN' : 'IT'}
        </button>
        <a href="#contact" className="nav-drawer-cta" onClick={closeMenu}>{t('nav.cta')}</a>
      </div>
    </nav>
  )
}
