import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setSession: (user, token) => set({ user, token }),

      setUser: (user) => set({ user }),

      logout: (callApi = true) => {
        if (callApi) {
          import('../api/authApi').then(({ logout }) => logout().catch(() => {}));
        }
        set({ user: null, token: null });
      },
    }),
    {
      name: 'ont-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);

export function hasRole(user, ...roles) {
  return !!user && roles.includes(user.role);
}

export function hasPoste(user, ...postes) {
  return !!user && postes.includes(user.poste);
}
