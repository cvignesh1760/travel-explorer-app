// Color Palette & Design Tokens for Travel Explorer App
export const COLORS = {
  primary: '#0D6EFD', // Ocean Blue
  primaryDark: '#0A58CA',
  primaryLight: '#E7F1FF',
  secondary: '#FF6B6B', // Coral Red for Wishlist / Highlights
  secondaryLight: '#FFE5E5',
  accent: '#FFB703', // Warm Sunlight / Rating Gold
  accentLight: '#FFF8E7',
  
  // Backgrounds
  background: '#F8F9FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',
  
  // Neutral & Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  shadow: '#0F172A',
  
  // Status
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Category badge colors
  categories: {
    Beaches: { bg: '#E0F2FE', text: '#0284C7', icon: 'water-outline' },
    Mountains: { bg: '#ECFDF5', text: '#059669', icon: 'trail-sign-outline' },
    Heritage: { bg: '#FEF3C7', text: '#D97706', icon: 'business-outline' },
    Adventure: { bg: '#FEE2E2', text: '#DC2626', icon: 'flame-outline' },
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
