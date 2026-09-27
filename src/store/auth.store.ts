import { create } from 'zustand';
import { UserSession } from '@/types/global';

interface AuthState {
  user: UserSession | null;
  token: string | null;
  setAuth: (user: UserSession, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
