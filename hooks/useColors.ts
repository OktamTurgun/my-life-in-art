import { createContext, useContext } from 'react';
import { DarkColors, LightColors } from '../constants/colors';

export type AppColors = typeof LightColors;

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function useColors(): AppColors {
  const { isDark } = useContext(ThemeContext);
  return isDark ? DarkColors : LightColors;
}

export function useTheme() {
  return useContext(ThemeContext);
}