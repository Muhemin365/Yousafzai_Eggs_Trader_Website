import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultContent } from '../data/defaultContent';

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
    }),
    { name: 'yousafzai-cms' }
  )
);
