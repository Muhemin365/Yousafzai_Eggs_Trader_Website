import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultContent } from '../data/defaultContent';

function deepMerge(defaults, persisted) {
  if (!persisted) return defaults;
  const result = { ...defaults };
  for (const key of Object.keys(persisted)) {
    if (key.startsWith('update')) continue;
    const dv = defaults[key];
    const pv = persisted[key];
    if (Array.isArray(dv) && Array.isArray(pv)) {
      result[key] = pv.map((item, i) => {
        if (i < dv.length && typeof item === 'object' && typeof dv[i] === 'object') {
          return { ...dv[i], ...item };
        }
        return item;
      });
    } else if (typeof dv === 'object' && typeof pv === 'object' && dv !== null && pv !== null) {
      result[key] = { ...dv, ...pv };
    } else {
      result[key] = pv;
    }
  }
  return result;
}

export const useCMSStore = create(
  persist(
    (set) => ({
      ...defaultContent,
      updateHero: (data) => set((s) => ({ hero: { ...s.hero, ...data } })),
      updateAbout: (data) => set((s) => ({ about: { ...s.about, ...data } })),
      updateProducts: (data) => set((s) => ({ products: { ...s.products, ...data } })),
      updateSolutions: (data) => set((s) => ({ solutions: { ...s.solutions, ...data } })),
      updateSupplyChain: (data) => set((s) => ({ supplyChain: { ...s.supplyChain, ...data } })),
      updateDistribution: (data) => set((s) => ({ distribution: { ...s.distribution, ...data } })),
      updateWhyUs: (data) => set((s) => ({ whyUs: { ...s.whyUs, ...data } })),
      updateQuality: (data) => set((s) => ({ quality: { ...s.quality, ...data } })),
      updateContact: (data) => set((s) => ({ contact: { ...s.contact, ...data } })),
      updateFooter: (data) => set((s) => ({ footer: { ...s.footer, ...data } })),
      updateCompany: (data) => set((s) => ({ company: { ...s.company, ...data } })),
      updateTestimonials: (testimonials) => set({ testimonials }),
      updateFaq: (faq) => set({ faq }),
      updateTeam: (team) => set((s) => ({ about: { ...s.about, team } })),
      updateCertifications: (certs) => set((s) => ({ quality: { ...s.quality, certs } })),
      updateProductItems: (items) => set((s) => ({ products: { ...s.products, items } })),
      updateProductSpecs: (specs) => set((s) => ({ products: { ...s.products, specs } })),
    }),
    {
      name: 'yousafzai-cms',
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => deepMerge(current, persisted),
    }
  )
);
