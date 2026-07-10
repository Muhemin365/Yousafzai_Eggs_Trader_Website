import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FileText, Package, Clock, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import SolutionsPage from './pages/SolutionsPage';
import ProcessPage from './pages/ProcessPage';
import QualityPage from './pages/QualityPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import HeroEditor from './components/admin/HeroEditor';
import TextEditor from './components/admin/TextEditor';
import ProductItemsEditor from './components/admin/ProductItemsEditor';
import SpecsEditor from './components/admin/SpecsEditor';
import { useCMSStore } from './store/useCMSStore';

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
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
