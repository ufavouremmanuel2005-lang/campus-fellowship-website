import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from '../data/siteData'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            className="brand-mark"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1iXcAvpqMwaFGBB6TfBAt_Jk8YwsaV_FURIDadQhmjA&s=10"
            alt="Campus Fellowship Logo"
          />
          <div>
            <strong>Campus Fellowship</strong>
            <span>Faith • Community • Impact</span>
          </div>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/join" className="primary-btn nav-btn" onClick={closeMenu}>
            Join Fellowship
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <img
              className="brand-mark"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1iXcAvpqMwaFGBB6TfBAt_Jk8YwsaV_FURIDadQhmjA&s=10"
              alt="Campus Fellowship Logo"
            />
            <div>
              <strong>Campus Fellowship</strong>
              <span>Growing in Christ.</span>
            </div>
          </div>
          <p>
            We are a Christ-centered student community helping young people grow in faith,
            build lasting friendships and serve the campus with purpose.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>+233 24 000 0000</li>
            <li>hello@campusfellowship.org</li>
            <li>University Campus, Student Center</li>
          </ul>
        </div>

        <div>
          <h4>Meeting Info</h4>
          <ul>
            <li>Sundays • 9:00 AM</li>
            <li>Wednesdays • 6:00 PM</li>
            <li>Prayer Nights • Fridays • 7:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Campus Fellowship. All rights reserved.</span>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return (
    <div className="page-shell">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
