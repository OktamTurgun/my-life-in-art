import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

// ===== PAROL VA PIN =====
const CORRECT_PIN = process.env.EXPO_PUBLIC_APP_PIN || '';
const CORRECT_PASSWORD = process.env.EXPO_PUBLIC_APP_PASSWORD || '';
const AUTH_KEY = 'auth_token';
const AUTH_EXPIRY_HOURS = 24;
// ========================

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (pin: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// Web va mobil uchun storage
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return null; // SSR himoya
      return localStorage.getItem(key);
    }
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return; // SSR himoya
      localStorage.setItem(key, value);
      return;
    }
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return; // SSR himoya
      localStorage.removeItem(key);
      return;
    }
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage.removeItem(key);
  },
};

export async function checkAuth(): Promise<boolean> {
  try {
    if (typeof window === 'undefined') return false; // SSR himoya
    const token = await storage.getItem(AUTH_KEY);
    if (!token) return false;
    const { expiry } = JSON.parse(token);
    return new Date().getTime() < expiry;
  } catch {
    return false;
  }
}

export async function saveAuth(): Promise<void> {
  const expiry = new Date().getTime() + AUTH_EXPIRY_HOURS * 60 * 60 * 1000;
  await storage.setItem(AUTH_KEY, JSON.stringify({ expiry }));
}

export async function clearAuth(): Promise<void> {
  await storage.removeItem(AUTH_KEY);
}

export function validateLogin(pin: string, password: string): boolean {
  return pin === CORRECT_PIN && password === CORRECT_PASSWORD;
}