import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'



const navLinks = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/bollywood', label: 'Bollywood', icon: '✦' },
  { to: '/hollywood', label: 'Hollywood', icon: '◈' },
  { to: '/technology', label: 'Technology', icon: '⬡' },
  { to: '/fitness', label: 'Fitness', icon: '◉' },
  { to: '/food', label: 'Food', icon: '◆' },
]

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const location = useLocation()
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg-base: #080a0f;
          --bg-nav: rgba(8, 10, 16, 0.85);
          --bg-nav-scrolled: rgba(6, 8, 13, 0.97);
          --border: rgba(255,255,255,0.06);
          --border-hover: rgba(255,255,255,0.15);
          --accent: #c8f000;
          --accent-dim: rgba(200, 240, 0, 0.12);
          --accent-glow: rgba(200, 240, 0, 0.35);
          --text-primary: #f0f2f5;
          --text-secondary: #8a8f9e;
          --surface: rgba(255,255,255,0.03);
          --surface-hover: rgba(255,255,255,0.07);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 24px;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          padding: 0 20px;
          background: var(--bg-nav);
          border: 1px solid var(--border);
          border-radius: 0 0 20px 20px;
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .nav-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-glow), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .nav-scrolled .nav-inner {
          background: var(--bg-nav-scrolled);
          border-color: rgba(200,240,0,0.12);
          box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,240,0,0.06);
        }

        .nav-scrolled .nav-inner::before {
          opacity: 1;
        }

        /* LOGO */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          position: relative;
          z-index: 2;
        }

        .logo-mark {
          width: 34px;
          height: 34px;
          background: var(--accent);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #080a0f;
          letter-spacing: -0.5px;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
          flex-shrink: 0;
        }

        .nav-logo:hover .logo-mark {
          transform: rotate(-8deg) scale(1.08);
          box-shadow: 0 0 20px var(--accent-glow);
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: var(--text-primary);
          letter-spacing: -0.3px;
          white-space: nowrap;
        }

        .logo-dot {
          color: var(--accent);
        }

        /* DESKTOP NAV LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.2px;
          transition: color 0.25s ease, background 0.25s ease;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: var(--surface-hover);
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active {
          color: var(--accent);
        }

        .nav-link.active::before {
          opacity: 1;
          transform: scale(1);
          background: var(--accent-dim);
        }

        .link-icon {
          font-size: 10px;
          opacity: 0.6;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
          position: relative;
          z-index: 1;
        }

        .nav-link:hover .link-icon {
          transform: scale(1.4) rotate(-10deg);
          opacity: 1;
        }

        .nav-link.active .link-icon {
          opacity: 1;
          color: var(--accent);
        }

        .link-label {
          position: relative;
          z-index: 1;
        }

        .link-underline {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover .link-underline,
        .nav-link.active .link-underline {
          transform: translateX(-50%) scaleX(1);
        }

        /* ACTIVE INDICATOR DOT */
        .active-dot {
          width: 4px;
          height: 4px;
          background: var(--accent);
          border-radius: 50%;
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          box-shadow: 0 0 6px var(--accent-glow);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link.active ~ .active-dot,
        .nav-item:has(.active) .active-dot {
          transform: translateX(-50%) scale(1);
        }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          gap: 5px;
          transition: background 0.25s ease, border-color 0.25s ease;
          flex-shrink: 0;
        }

        .hamburger:hover {
          background: var(--surface-hover);
          border-color: var(--border-hover);
        }

        .ham-line {
          width: 18px;
          height: 1.5px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, width 0.25s ease;
          transform-origin: center;
        }

        .hamburger.open .ham-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }

        .hamburger.open .ham-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger.open .ham-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed;
          top: 0; right: 0;
          width: min(340px, 90vw);
          height: 100dvh;
          background: #0c0e15;
          border-left: 1px solid var(--border);
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 100px 28px 40px;
          gap: 6px;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.45s ease;
        }

        .mobile-menu-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          border: 1px solid transparent;
          transition: all 0.3s ease;
          transform: translateX(30px);
          opacity: 0;
          animation: none;
        }

        .mobile-menu.open .mobile-link {
          animation: slideInRight 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .mobile-menu.open .mobile-link:nth-child(1) { animation-delay: 0.05s; }
        .mobile-menu.open .mobile-link:nth-child(2) { animation-delay: 0.10s; }
        .mobile-menu.open .mobile-link:nth-child(3) { animation-delay: 0.15s; }
        .mobile-menu.open .mobile-link:nth-child(4) { animation-delay: 0.20s; }
        .mobile-menu.open .mobile-link:nth-child(5) { animation-delay: 0.25s; }
        .mobile-menu.open .mobile-link:nth-child(6) { animation-delay: 0.30s; }

        @keyframes slideInRight {
          to { transform: translateX(0); opacity: 1; }
        }

        .mobile-link:hover {
          background: var(--surface-hover);
          border-color: var(--border-hover);
          color: var(--text-primary);
          transform: translateX(6px) !important;
          opacity: 1 !important;
        }

        .mobile-link.active {
          background: var(--accent-dim);
          border-color: rgba(200,240,0,0.2);
          color: var(--accent);
          transform: translateX(0) !important;
          opacity: 1 !important;
        }

        .mobile-link-icon {
          width: 34px;
          height: 34px;
          background: var(--surface);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }

        .mobile-link:hover .mobile-link-icon {
          background: rgba(200,240,0,0.15);
          transform: scale(1.1) rotate(-5deg);
        }

        .mobile-link.active .mobile-link-icon {
          background: rgba(200,240,0,0.2);
        }

        .mobile-menu-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-secondary);
          opacity: 0.5;
          padding: 0 18px;
          margin-bottom: 4px;
        }

        /* GLOW ORB */
        .nav-glow {
          position: absolute;
          width: 200px;
          height: 40px;
          background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 50%;
        }

        .nav-scrolled .nav-glow {
          opacity: 0.4;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .nav-inner { padding: 0 16px; }
        }

        @media (max-width: 480px) {
          .nav-wrapper { padding: 0 12px; }
          .logo-text { font-size: 15px; }
        }
      `}</style>

      <nav
        ref={menuRef}
        className={`nav-wrapper${scrolled ? ' nav-scrolled' : ''}`}
      >
        <div className="nav-inner">
          <div className="nav-glow" />

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-mark">N</div>
            <span className="logo-text">News<span className="logo-dot">.</span>Hub</span>
          </Link>

          {/* Desktop Links */}

          <ul className="nav-links">
            {navLinks.map((link, i) => (

              <li key={link.to} className="nav-item">
                <Link
                  to={link.to}
                  className={`nav-link${isActive(link.to) ? ' active' : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-label">{link.label}</span>
                  <span className="link-underline" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`mobile-menu-backdrop${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <p className="mobile-menu-label">Navigation</p>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`mobile-link${isActive(link.to) ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mobile-link-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar