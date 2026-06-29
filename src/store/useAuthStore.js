import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password) => {
        if (email === 'admin@yousafzaigroup.com' && password === 'Admin@2025') {
          set({ isAuthenticated: true, user: { email, name: 'Admin' } });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: 'yousafzai-auth' }
  )
);
