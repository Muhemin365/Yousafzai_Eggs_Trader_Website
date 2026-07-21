import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const etTheme = {
  navy: '#064E3B',
  'navy-2': '#0D6B3D',
  'navy-deep': '#022C22',
  'navy-glow': 'rgba(5,150,105,0.35)',
  gold: '#10B981',
  'gold-lt': '#A7F3D0',
  'gold-dk': '#059669',
};

const navLinks = [
  { path: '/egg-traders/about', label: 'About Us' },
  { path: '/egg-traders/products', label: 'Products' },
  { path: '/egg-traders/solutions', label: 'Solutions' },
  { path: '/egg-traders/process', label: 'Process' },
  { path: '/egg-traders/quality', label: 'Quality' },
  { path: '/egg-traders/contact', label: 'Contact Us' },
];

export default function EggTradersNavbar({ scrolled, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className={`et-nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          padding: 0,
          overflow: 'hidden',
          background: '#064E3B',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06)',
          transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/egg-traders" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Yousafzai EGRO" style={{ height: 100, width: 'auto', flexShrink: 0, display: 'block' }} />
            </div>
          </Link>

          <div className="et-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`et-nav-link ${isActive(link.path) ? 'active' : ''}`}
                style={{
                  fontSize: 13.5, fontWeight: 500,
                  color: '#FFFFFF',
                  position: 'relative', padding: '6px 0',
                  transition: 'opacity 0.25s, color 0.4s', textDecoration: 'none',
                }}
              >
                {link.label}
                <span style={{
                  position: 'absolute', left: 0, bottom: 0,
                  width: isActive(link.path) ? '100%' : 0, height: 2,
                  background: etTheme.gold,
                  transition: 'width 0.3s cubic-bezier(.22,1,.36,1)',
                }} />
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link to="/egg-traders/contact" className="et-btn et-btn-primary et-btn-sm" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13,
              padding: '10px 20px', borderRadius: 9, border: 'none', cursor: 'pointer',
              position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap',
              background: 'linear-gradient(120deg,#059669,#10B981 55%,#A7F3D0)',
              color: '#022C22', boxShadow: '0 10px 24px rgba(5,150,105,0.35)',
              textDecoration: 'none',
            }}>
              <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                Start Trading
              </span>
            </Link>
            <Link to="/" className="et-mainsite-link" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12.5,
              padding: '9px 16px', borderRadius: 8,
              border: '1.5px solid rgba(255,255,255,0.5)',
              background: 'transparent', color: '#FFFFFF',
              cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              Main Site
            </Link>
            <button
              className={`et-menu-toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`et-mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`et-mobile-panel ${mobileOpen ? 'open' : ''}`}>
        <div style={{ height: 20 }} />
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
            style={{
              color: 'rgba(255,255,255,0.8)', fontSize: 17, fontFamily: "'Space Grotesk',sans-serif",
              textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
              transition: 'color 0.25s',
            }}
            onMouseEnter={e => e.target.style.color = etTheme['gold-lt']}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
          >{link.label}</Link>
        ))}
        <Link to="/egg-traders/contact" onClick={() => setMobileOpen(false)}
          style={{
            marginTop: 24, color: etTheme['gold-lt'], fontSize: 17, fontFamily: "'Space Grotesk',sans-serif",
            textDecoration: 'none', padding: '14px 0', fontWeight: 600,
            borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 8,
          }}>
          Start Trading
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </Link>
      </div>

      <style>{`
        .et-nav::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #10B981 0%, #059669 25%, #064E3B 60%, rgba(6,78,59,0.06) 85%, transparent 100%);
        }
        .et-nav-links { display: flex !important; }
        .et-mainsite-link { display: inline-flex !important; }
        .et-menu-toggle {
          display: none !important;
          width: 36px; height: 36px;
          background: transparent; border: none;
          cursor: pointer;
          flex-direction: column; align-items: center; justify-content: center;
          gap: 5px;
          position: relative; z-index: 510;
          padding: 0;
        }
        .et-menu-toggle span {
          display: block;
          width: 22px; height: 2px;
          background: #FFFFFF;
          border-radius: 2px;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          transform-origin: center;
        }
        .et-menu-toggle.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .et-menu-toggle.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .et-menu-toggle.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .et-mobile-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 490;
          opacity: 0; visibility: hidden;
          transition: opacity .35s ease, visibility .35s ease;
        }
        .et-mobile-overlay.open {
          opacity: 1; visibility: visible;
        }

        .et-mobile-panel {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 300px; max-width: 85vw;
          background: ${etTheme['navy-deep']};
          z-index: 495;
          transform: translateX(100%);
          transition: transform .4s cubic-bezier(.22,1,.36,1);
          display: flex; flex-direction: column;
          padding: 80px 32px 32px;
          overflow-y: auto;
        }
        .et-mobile-panel.open {
          transform: translateX(0);
        }

        @media (max-width: 860px) {
          .et-nav-links { display: none !important; }
          .et-menu-toggle { display: flex !important; }
        }
        @media (max-width: 640px) {
          .et-mainsite-link { display: none !important; }
          .et-mobile-panel { padding: 72px 24px 24px; }
        }
        @media (max-width: 420px) {
          nav > div { padding-left: 16px !important; padding-right: 16px !important; }
          nav > div > a:nth-child(1) img { height: 72px !important; }
          .et-btn-sm { padding: 8px 14px !important; font-size: 11.5px !important; }
          .et-btn-sm span { gap: 4px !important; }
          .et-mobile-panel { padding: 64px 20px 20px; width: 100%; max-width: 100%; }
        }
      `}</style>
    </>
  );
}
