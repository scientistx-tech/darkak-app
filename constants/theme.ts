/**
 * Theme configuration for the e-commerce app
 * Colors, typography, spacing based on the design system
 */

import { Platform } from 'react-native';

// Primary brand color from the design
// Brand colors (customized)
const primaryBlue = '#00153B';
const primaryDarkBlue = '#00102C';
const primaryLight = '#0B2A62';

const secondary500 = '#003084';
const secondary400 = '#5694FF';
const secondary300 = '#BBD4FF';
const secondary100 = '#E6EFFF';

const backgroundWhite = '#FFFFFF';

export const Colors = {
  light: {
    // Primary colors
    primary: primaryBlue,
    primaryDark: primaryDarkBlue,
    primaryLight: secondary400,
    
  // Background colors
  background: backgroundWhite,
    surface: '#FFFFFF',
    card: '#FFFFFF',
    
    // Text colors
    text: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    
    // Accent colors
    accent: '#FF6B6B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // UI elements
    border: '#E5E7EB',
    divider: '#F3F4F6',
    shadow: '#000000',
    
    // Tab bar
    tabBarBackground: '#FFFFFF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryBlue,
    tabBarBorder: '#E5E7EB',
    
    // Badge
    discountBadge: '#FF6B6B',
    newBadge: '#10B981',
    
    // Rating
    ratingActive: '#FFC107',
    ratingInactive: '#E5E7EB',
    // Secondary palette
    secondary: {
      500: secondary500,
      400: secondary400,
      300: secondary300,
      100: secondary100,
    },
  },
  dark: {
    // Primary colors
    primary: primaryBlue,
    primaryDark: primaryDarkBlue,
    primaryLight: primaryLight,
    
    // Background colors
    background: '#111827',
    surface: '#1F2937',
    card: '#374151',
    
    // Text colors
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    
    // Accent colors
    accent: '#FF8A8A',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    
    // UI elements
    border: '#374151',
    divider: '#4B5563',
    shadow: '#000000',
    
    // Tab bar
    tabBarBackground: '#1F2937',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryBlue,
    tabBarBorder: '#374151',
    
    // Badge
    discountBadge: '#FF8A8A',
    newBadge: '#34D399',
    
    // Rating
    ratingActive: '#FFC107',
    ratingInactive: '#4B5563',
    // Secondary palette
    secondary: {
      500: secondary500,
      400: secondary400,
      300: secondary300,
      100: secondary100,
    },
  },
};

export const Typography = {
  fontSizes: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
