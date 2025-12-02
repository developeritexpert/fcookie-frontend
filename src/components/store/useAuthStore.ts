import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  expiresIn: number | null;
  rememberMe: boolean;
  setAuth: (data: { user: User; token: string; expiresIn: number; rememberMe: boolean }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      expiresIn: null,
      rememberMe: false,

      setAuth: ({ user, token, expiresIn, rememberMe }) =>
        set({ user, token, expiresIn, rememberMe }),

      logout: () => set({ user: null, token: null, expiresIn: null, rememberMe: false }),
    }),
    {
      name: "fcookie-auth", // storage key
    }
  )
);
