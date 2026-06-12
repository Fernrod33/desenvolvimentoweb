import { useState } from 'react'
import './Header.css'

const Header = ({ navItems, ctaLabel }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Ir para o topo da página">
          <span className="brand-mark">A</span>
          <span>
            <strong>Aurora</strong>
            <small>Growth Suite</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} id="primary-navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="button button-primary button-small" href="#contact" onClick={closeMenu}>
            {ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
