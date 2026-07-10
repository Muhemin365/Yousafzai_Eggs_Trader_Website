import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [showBackTop, setShowBackTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('[data-ripple]');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (loading) {
    return (
      <div id="loader">
        <div className="loader-mark">
          <div className="loader-ring" />
          YOUSAFZAI EGRO
        </div>
        <style>{`
          #loader { position: fixed; inset: 0; background: #071A30; z-index: 9999; display: flex; align-items: center; justify-content: center; }
          .loader-mark { font-family: 'Space Grotesk',sans-serif; color: #FFFFFF; font-size: 15px; letter-spacing: .18em; display: flex; flex-direction: column; align-items: center; gap: 18px; }
          .loader-ring { width: 46px; height: 46px; border-radius: 50%; border: 2px solid rgba(255,255,255,.18); border-top-color: #C8A24A; animation: loaderSpin 0.9s linear infinite; }
          @keyframes loaderSpin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterSection />

      <div className={`back-top ${showBackTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>

      <style>{`
        .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.55); transform: scale(0); animation: rippleAnim .6s ease-out; pointer-events: none; }
        @keyframes rippleAnim { to { transform: scale(3.2); opacity: 0; } }
        .back-top { position: fixed; bottom: 28px; right: 28px; width: 48px; height: 48px; border-radius: 50%; background: #0B2545; color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 14px 36px rgba(11,37,69,0.10); opacity: 0; transform: translateY(10px); transition: opacity .3s, transform .3s; z-index: 300; }
        .back-top.show { opacity: 1; transform: translateY(0); }
        .back-top:hover { background: #C8A24A; color: #071A30; }
      `}</style>
    </>
  );
}
