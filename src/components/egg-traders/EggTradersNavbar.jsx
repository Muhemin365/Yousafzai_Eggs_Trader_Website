import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const etTheme = {
  navy: '#0B2545',
  'navy-2': '#173E72',
  'navy-deep': '#071A30',
  'navy-glow': 'rgba(200,162,74,0.35)',
  gold: '#C8A24A',
  'gold-lt': '#F1E4C3',
  'gold-dk': '#9C7B2E',
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
          background: '#0B2545',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06)',
          transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/egg-traders" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Yousafzai EGRO" style={{ height: 100, width: 'auto', flexShrink: 0, display: 'block' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '0.02em', color: '#FFFFFF' }}>
                Egg Traders
              </span>
              <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: etTheme['gold-lt'], fontWeight: 600 }}>
                Poultry Marketplace
              </span>
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
              background: 'linear-gradient(120deg,#9C7B2E,#C8A24A 55%,#F1E4C3)',
              color: '#071A30', boxShadow: '0 10px 24px rgba(200,162,74,0.35)',
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
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: '#FFFFFF' }}>Egg Traders</span>
          <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: etTheme['gold-lt'], fontWeight: 600, marginTop: 4 }}>Poultry Marketplace</span>
        </div>
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
          background: linear-gradient(90deg, #C8A24A 0%, #9C7B2E 25%, #5A7B9C 60%, rgba(11,37,69,0.06) 85%, transparent 100%);
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
          nav > div > a:nth-child(1) span:first-child { font-size: 13px !important; }
          nav > div > a:nth-child(1) span:last-child { display: none !important; }
          nav > div > a:nth-child(1) { gap: 8px !important; }
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
