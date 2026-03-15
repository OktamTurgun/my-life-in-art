import { useColorScheme } from 'react-native';
import { DarkColors, LightColors } from '../constants/colors';

export function useColors() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? DarkColors : LightColors;
}

export type AppColors = typeof LightColors;