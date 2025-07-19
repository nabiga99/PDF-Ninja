import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  isPremiumUser: boolean;
  login: () => void;
  logout: () => void;
  upgrade: () => void;
}

// This is a mock auth store for demonstration purposes.
// In a real application, you would integrate with your authentication provider.
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isPremiumUser: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, isPremiumUser: false }),
  upgrade: () => set({ isLoggedIn: true, isPremiumUser: true }),
}));
