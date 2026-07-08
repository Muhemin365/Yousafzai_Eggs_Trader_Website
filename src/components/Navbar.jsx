import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const company = useCMSStore((s) => s.company);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { href: '#about', id: 'about', label: 'About Us' },
    { href: '#products', id: 'products', label: 'Products' },
    { href: '#solutions', id: 'solutions', label: 'Solutions' },
    { href: '#process', id: 'process', label: 'Process' },
    { href: '#quality', id: 'quality', label: 'Quality' },
    { href: '#contact', id: 'contact', label: 'Contact Us' },
  ];

  return (
    <>
      <nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: scrolled ? '12px 0' : '22px 0',
          background: scrolled ? 'rgba(255,255,255,0.86)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(11,37,69,0.06)' : 'none',
          transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 32px 0 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="#home" className="brand" onClick={scrollTo('home')} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={logo}
              alt="Yousafzai EGRO"
              style={{
                height: 42,
                width: 'auto',
                flexShrink: 0,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span
                className="brand-name"
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: '0.02em',
                  color: scrolled ? '#0B2545' : '#FFFFFF',
                  transition: 'color 0.4s',
                }}
              >
                {company.name}
              </span>
              <span
                className="brand-sub"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: scrolled ? '#9C7B2E' : '#C8A24A',
                  fontWeight: 600,
                  transition: 'color 0.4s',
                }}
              >
                {company.sub}
              </span>
            </div>
          </a>

          <div
            className="nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 36,
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={scrollTo(link.id)}
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: scrolled ? '#444C5C' : 'rgba(255,255,255,0.86)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'opacity 0.25s, color 0.4s',
                  textDecoration: 'none',
                }}
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: 0,
                    height: 2,
                    background: '#C8A24A',
                    transition: 'width 0.3s cubic-bezier(.22,1,.36,1)',
                  }}
                  className="nav-underline"
                />
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a
              href="#contact"
              className="btn btn-gold btn-sm"
              onClick={scrollTo('contact')}
              data-ripple
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontFamily: "'Inter',sans-serif",
                fontWeight: 600,
                fontSize: 13.5,
                padding: '10px 20px',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(120deg,#9C7B2E,#C8A24A 55%,#F1E4C3)',
                color: '#071A30',
                boxShadow: '0 10px 24px rgba(200,162,74,0.35)',
                textDecoration: 'none',
              }}
            >
              <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                Request Quote
              </span>
            </a>
            <button
              className="menu-toggle"
              id="menuToggle"
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                width: 38,
                height: 38,
                borderRadius: 8,
                border: `1px solid ${scrolled ? '#DBDFE6' : 'rgba(255,255,255,0.3)'}`,
                background: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? (
                <X size={18} color={scrolled ? '#0B2545' : '#FFFFFF'} />
              ) : (
                <>
                  <span style={{ width: 18, height: 1.6, background: scrolled ? '#0B2545' : '#FFFFFF', transition: '0.3s' }} />
                  <span style={{ width: 18, height: 1.6, background: scrolled ? '#0B2545' : '#FFFFFF', transition: '0.3s' }} />
                  <span style={{ width: 18, height: 1.6, background: scrolled ? '#0B2545' : '#FFFFFF', transition: '0.3s' }} />
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobileMenu"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#071A30',
            zIndex: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="m-link"
              style={{ color: '#fff', fontSize: 20, fontFamily: "'Space Grotesk',sans-serif" }}
              onClick={scrollTo(link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .menu-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
