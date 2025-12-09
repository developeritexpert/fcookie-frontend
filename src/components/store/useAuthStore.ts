"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  expireAt: number | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  setAuth: (params: {
    user: User;
    token: string;
    expireInMs?: number;
    rememberMe?: boolean;
  }) => void;

  setHasHydrated: (state: boolean) => void;

  logout: () => void;
  checkExpiry: () => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;

  getUser: () => User | null;
  getToken: () => string | null;
  isAuth: () => boolean;
}

const fallbackStorage = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expireAt: null,
      isAuthenticated: false,
      hasHydrated: false,

      setAuth: ({ user, token, expireInMs, rememberMe }) => {
        // If the backend doesn't explicitly give us an expiry, we calculate it.
        // Even if it does, the user might want "Remember Me" to extend it (if the token supports it).
        // Since we are doing client-side checks:

        let duration = expireInMs;

        if (rememberMe) {
          // 7 days in milliseconds
          duration = 7 * 24 * 60 * 60 * 1000;
        } else if (!duration) {
          // Default 24 hours if nothing provided
          duration = 24 * 60 * 60 * 1000;
        }

        const expireAt = Date.now() + duration;

        set({
          user,
          token,
          expireAt,
          isAuthenticated: true,
        });
      },

      setHasHydrated: (state) => {
        set({
          hasHydrated: state
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          expireAt: null,
          isAuthenticated: false,
        });
      },

      checkExpiry: () => {
        const { expireAt } = get();
        const now = Date.now();

        if (!expireAt) return false;
        if (now > expireAt) {
          get().logout();
          return false;
        }
        return true;
      },

      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },

      hasAnyRole: (roles) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
      },

      getUser: () => get().user,
      getToken: () => get().token,

      isAuth: () => {
        const state = get();
        return state.isAuthenticated && state.checkExpiry();
      },
    }),

    {
      name: "auth-storage",

      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : fallbackStorage
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;
