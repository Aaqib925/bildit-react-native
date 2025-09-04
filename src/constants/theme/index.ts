import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const colors = {
  primary: '#4F46E5', 
  secondary: '#10B981', 
  accent: '#F59E0B',
  danger: '#EF4444',

  // Neutral shades
  black: '#121212',
  gray900: '#1F2937',
  gray700: '#374151',
  gray500: '#6B7280',
  gray300: '#D1D5DB',
  gray100: '#F3F4F6',
  white: '#FFFFFF',
};

// --- Custom Light & Dark Themes for React Navigation ---
export const CUSTOM_LIGHT_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.gray100,
    card: colors.white,
    text: colors.gray900,
    border: colors.gray300,
    notification: colors.danger,
  },
};

export const CUSTOM_DARK_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.black,
    card: colors.gray900,
    text: colors.gray100,
    border: colors.gray700,
    notification: colors.danger,
  },
};

