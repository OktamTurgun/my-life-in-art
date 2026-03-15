import { useContext } from 'react';
import { ThemeContext } from '../app/_layout';
import { DarkColors, LightColors } from '../constants/colors';

export function useColors() {
  const { isDark } = useContext(ThemeContext);
  return isDark ? DarkColors : LightColors;
}

export type AppColors = typeof LightColors;