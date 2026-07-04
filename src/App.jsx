import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FileText, Package, Clock, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import TradingSolutionsSection from './components/TradingSolutionsSection';
import SupplyChainSection from './components/SupplyChainSection';
import WhyUsSection from './components/WhyUsSection';
import ProcessSection from './components/ProcessSection';
import QualitySection from './components/QualitySection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import HeroEditor from './components/admin/HeroEditor';
import TextEditor from './components/admin/TextEditor';
import ProductItemsEditor from './components/admin/ProductItemsEditor';
import SpecsEditor from './components/admin/SpecsEditor';
import { useCMSStore } from './store/useCMSStore';

function MainSite() {
  const [loading, setLoading] = useState(true);
  const [showBackTop, setShowBackTop] = useState(false);
  const initFromApi = useCMSStore((s) => s.initFromApi);

  useEffect(() => {
    initFromApi();
  }, [initFromApi]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

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
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <TradingSolutionsSection />
      <SupplyChainSection />
      <WhyUsSection />
      <ProcessSection />
      <QualitySection />
      <FAQSection />
      <CTASection />
      <ContactSection />
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

function AdminDashboard() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Sections', value: '14', icon: FileText },
          { label: 'CMS Items', value: '50+', icon: Package },
          { label: 'Last Build', value: new Date().toLocaleDateString(), icon: Clock },
          { label: 'Status', value: 'Live', icon: CheckCircle2 },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#F5F7FA', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ marginBottom: 8 }}>{stat.icon ? <stat.icon size={24} style={{ color: '#0B2545' }} /> : null}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: '#0B2545' }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#707888', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 14, color: '#707888' }}>Select a section from the sidebar to edit content. All changes auto-save and update the live site instantly.</p>
    </div>
  );
}

function AdminApp() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [section, setSection] = useState('dashboard');
  const about = useCMSStore((s) => s.about);
  const updateAbout = useCMSStore((s) => s.updateAbout);
  const products = useCMSStore((s) => s.products);
  const updateProducts = useCMSStore((s) => s.updateProducts);
  const updateProductItems = useCMSStore((s) => s.updateProductItems);
  const updateProductSpecs = useCMSStore((s) => s.updateProductSpecs);
  const quality = useCMSStore((s) => s.quality);
  const updateQuality = useCMSStore((s) => s.updateQuality);
  const contact = useCMSStore((s) => s.contact);
  const updateContact = useCMSStore((s) => s.updateContact);
  const company = useCMSStore((s) => s.company);
  const updateCompany = useCMSStore((s) => s.updateCompany);
  const testimonials = useCMSStore((s) => s.testimonials);
  const updateTestimonials = useCMSStore((s) => s.updateTestimonials);
  const faq = useCMSStore((s) => s.faq);
  const updateFaq = useCMSStore((s) => s.updateFaq);
  const solutions = useCMSStore((s) => s.solutions);
  const updateSolutions = useCMSStore((s) => s.updateSolutions);
  const supplyChain = useCMSStore((s) => s.supplyChain);
  const updateSupplyChain = useCMSStore((s) => s.updateSupplyChain);
  const whyUs = useCMSStore((s) => s.whyUs);
  const updateWhyUs = useCMSStore((s) => s.updateWhyUs);

  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  const renderEditor = () => {
    switch (section) {
      case 'dashboard': return <AdminDashboard />;
      case 'hero': return <HeroEditor />;
      case 'about': return (
        <TextEditor
          data={about}
          onUpdate={updateAbout}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle' },
            { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
            { key: 'quoteFooter', label: 'Quote Footer' },
          ]}
        />
      );
      case 'products': return (
        <div>
          <TextEditor
            data={products}
            onUpdate={updateProducts}
            fields={[
              { key: 'eyebrow', label: 'Eyebrow' },
              { key: 'title', label: 'Title' },
              { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            ]}
          />
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1.5px solid #EEF1F5' }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: '#0B2545', margin: '0 0 16px' }}>Product Items</h3>
            <ProductItemsEditor items={products.items} onUpdate={updateProductItems} />
          </div>
          <SpecsEditor specs={products.specs} onUpdate={updateProductSpecs} />
        </div>
      );
      case 'quality': return (
        <TextEditor
          data={quality}
          onUpdate={updateQuality}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'contact': return (
        <TextEditor
          data={contact}
          onUpdate={updateContact}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'company': return (
        <TextEditor
          data={company}
          onUpdate={updateCompany}
          fields={[
            { key: 'name', label: 'Company Name' },
            { key: 'sub', label: 'Sub Label' },
            { key: 'tagline', label: 'Tagline', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'solutions': return (
        <TextEditor
          data={solutions}
          onUpdate={updateSolutions}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'supplyChain': return (
        <TextEditor
          data={supplyChain}
          onUpdate={updateSupplyChain}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'whyUs': return (
        <TextEditor
          data={whyUs}
          onUpdate={updateWhyUs}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
          ]}
        />
      );
      case 'testimonials': return (
        <div>
          {testimonials.map((t, i) => (
            <div key={i} style={{ marginBottom: 16, padding: 16, background: '#F5F7FA', borderRadius: 8 }}>
              <input value={t.text} onChange={(e) => { const s = [...testimonials]; s[i] = { ...s[i], text: e.target.value }; updateTestimonials(s); }} style={{ ...inputStyle, marginBottom: 8 }} placeholder="Quote text" />
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={t.name} onChange={(e) => { const s = [...testimonials]; s[i] = { ...s[i], name: e.target.value }; updateTestimonials(s); }} style={{ ...inputStyle, flex: 1 }} placeholder="Name" />
                <input value={t.role} onChange={(e) => { const s = [...testimonials]; s[i] = { ...s[i], role: e.target.value }; updateTestimonials(s); }} style={{ ...inputStyle, flex: 1 }} placeholder="Role" />
              </div>
            </div>
          ))}
        </div>
      );
      case 'faq': return (
        <div>
          {faq.map((item, i) => (
            <div key={i} style={{ marginBottom: 16, padding: 16, background: '#F5F7FA', borderRadius: 8 }}>
              <input value={item.q} onChange={(e) => { const s = [...faq]; s[i] = { ...s[i], q: e.target.value }; updateFaq(s); }} style={{ ...inputStyle, marginBottom: 8 }} placeholder="Question" />
              <textarea value={item.a} onChange={(e) => { const s = [...faq]; s[i] = { ...s[i], a: e.target.value }; updateFaq(s); }} rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Answer" />
            </div>
          ))}
        </div>
      );
      default: return <p style={{ color: '#707888' }}>Select a section to edit</p>;
    }
  };

  return (
    <AdminLayout activeSection={section} setActiveSection={setSection}>
      {renderEditor()}
    </AdminLayout>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1.4px solid #DBDFE6',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "'Inter',sans-serif",
  color: '#1B2230',
  background: '#FFFFFF',
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
