export interface Tenant {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  settings: TenantSettings;
}

export interface TenantSettings {
  themeId: string;
  skinId: string;
  brandingId: string;
  customDomain?: string;
  features: string[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  colors: ThemeColors;
  typography: TypographySettings;
  spacing: SpacingSettings;
  shadows: ShadowSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface TypographySettings {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface SpacingSettings {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ShadowSettings {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface Skin {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  layout: LayoutSettings;
  components: ComponentSettings;
  animations: AnimationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface LayoutSettings {
  sidebar: {
    position: 'left' | 'right';
    width: string;
    collapsed: boolean;
  };
  header: {
    height: string;
    sticky: boolean;
  };
  footer: {
    visible: boolean;
    height: string;
  };
  content: {
    maxWidth: string;
    padding: string;
  };
}

export interface ComponentSettings {
  buttons: {
    borderRadius: string;
    padding: string;
    variants: 'filled' | 'outlined' | 'ghost';
  };
  cards: {
    borderRadius: string;
    padding: string;
    shadow: string;
  };
  inputs: {
    borderRadius: string;
    borderWidth: string;
    focusRing: string;
  };
}

export interface AnimationSettings {
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  hover: {
    scale: number;
    shadow: string;
  };
}

export interface Branding {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  logo: LogoSettings;
  favicon: string;
  colors: BrandColors;
  fonts: FontSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface LogoSettings {
  primary: string;
  secondary?: string;
  favicon: string;
  dimensions: {
    width: number;
    height: number;
  };
  altText: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

export interface FontSettings {
  primary: string;
  secondary: string;
  weights: number[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  components: TemplateComponent[];
  layout: TemplateLayout;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateComponent {
  id: string;
  type: 'header' | 'hero' | 'content' | 'sidebar' | 'footer' | 'custom';
  props: Record<string, any>;
  children?: TemplateComponent[];
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export interface TemplateLayout {
  type: 'grid' | 'flexbox' | 'absolute';
  columns: number;
  rows: number;
  gap: string;
  padding: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'admin' | 'editor';
  permissions: string[];
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
}

