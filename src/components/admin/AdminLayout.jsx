import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useCMSStore } from '../../store/useCMSStore';

const navItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Hero Section', key: 'hero' },
  { label: 'About Section', key: 'about' },
  { label: 'Products', key: 'products' },
  { label: 'Solutions', key: 'solutions' },
  { label: 'Supply Chain', key: 'supplyChain' },
  { label: 'Why Us', key: 'whyUs' },
  { label: 'Quality/Certs', key: 'quality' },
  { label: 'Testimonials', key: 'testimonials' },
  { label: 'FAQ', key: 'faq' },
  { label: 'Contact Info', key: 'contact' },
  { label: 'Company Info', key: 'company' },
  { label: 'Our Companies', key: 'ourCompanies' },
  { type: 'divider' },
  { label: 'ET Company', key: 'eggTradersCompany' },
  { label: 'ET Hero', key: 'eggTradersHero' },
  { label: 'ET About', key: 'eggTradersAbout' },
  { label: 'ET Services', key: 'eggTradersServices' },
  { label: 'ET Products', key: 'eggTradersProducts' },
  { label: 'ET Solutions', key: 'eggTradersSolutions' },
  { label: 'ET Process', key: 'eggTradersProcess' },
  { label: 'ET Quality', key: 'eggTradersQuality' },
  { label: 'ET Contact', key: 'eggTradersContact' },
];

export default function AdminLayout({ activeSection, setActiveSection, children }) {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F7FA' }}>
      <div style={{ width: collapsed ? 60 : 260, background: '#0B2545', color: '#fff', transition: 'width 0.3s', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#F1E4C3" strokeWidth="1.6" width="28" height="28" style={{ flexShrink: 0 }}>
              <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
            </svg>
            {!collapsed && <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Admin Panel</span>}
          </div>
        </div>
        <div style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
          {navItems.map((item) =>
            item.type === 'divider' ? (
              <div key="div" style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 16px' }} />
            ) : (
              <div
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  background: activeSection === item.key ? 'rgba(200,162,74,0.15)' : 'transparent',
                  borderLeft: activeSection === item.key ? '3px solid #C8A24A' : '3px solid transparent',
                  fontSize: 13,
                  fontWeight: activeSection === item.key ? 600 : 400,
                  color: activeSection === item.key ? '#C8A24A' : 'rgba(255,255,255,0.65)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {collapsed ? item.label[0] : item.label}
              </div>
            )
          )}
        </div>
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {!collapsed && (
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              {user?.email}
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/admin/login', { replace: true }); }}
            style={{ width: '100%', padding: '8px 0', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}
          >
            {collapsed ? 'L' : 'Logout'}
          </button>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ position: 'absolute', bottom: 80, left: collapsed ? 10 : 220, background: '#123A6B', border: 'none', color: '#fff', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: '#0B2545', margin: 0 }}>{navItems.find((n) => n.key === activeSection)?.label || 'Dashboard'}</h1>
          <p style={{ fontSize: 13, color: '#707888', marginTop: 4 }}>Edit content for the Yousafzai EGRO website</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #EEF1F5', boxShadow: '0 2px 10px rgba(11,37,69,0.06)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
