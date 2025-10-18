import { Theme, Skin, Branding, Template, Tenant } from '@/types'

export const mockThemes: Theme[] = [
  {
    id: 'theme-1',
    name: 'Modern Blue',
    description: 'A clean, modern theme with blue accents',
    isDefault: true,
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: {
        primary: '#1E293B',
        secondary: '#64748B',
        disabled: '#94A3B8'
      },
      border: '#E2E8F0',
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
      info: '#3B82F6'
    },
    typography: {
      fontFamily: {
        primary: 'Inter',
        secondary: 'Inter',
        mono: 'JetBrains Mono'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'theme-2',
    name: 'Dark Elegant',
    description: 'A sophisticated dark theme for premium applications',
    isDefault: false,
    colors: {
      primary: '#8B5CF6',
      secondary: '#64748B',
      accent: '#F59E0B',
      background: '#0F172A',
      surface: '#1E293B',
      text: {
        primary: '#F8FAFC',
        secondary: '#CBD5E1',
        disabled: '#64748B'
      },
      border: '#334155',
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
      info: '#3B82F6'
    },
    typography: {
      fontFamily: {
        primary: 'Inter',
        secondary: 'Inter',
        mono: 'JetBrains Mono'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.4)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.5)'
    },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
]

export const mockSkins: Skin[] = [
  {
    id: 'skin-1',
    name: 'Standard Layout',
    description: 'Traditional sidebar layout with header and footer',
    isDefault: true,
    layout: {
      sidebar: {
        position: 'left',
        width: '280px',
        collapsed: false
      },
      header: {
        height: '64px',
        sticky: true
      },
      footer: {
        visible: true,
        height: '60px'
      },
      content: {
        maxWidth: '1200px',
        padding: '2rem'
      }
    },
    components: {
      buttons: {
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        variants: 'filled'
      },
      cards: {
        borderRadius: '0.75rem',
        padding: '1.5rem',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      },
      inputs: {
        borderRadius: '0.5rem',
        borderWidth: '1px',
        focusRing: '0 0 0 3px rgb(59 130 246 / 0.1)'
      }
    },
    animations: {
      transitions: {
        fast: '150ms ease-in-out',
        normal: '300ms ease-in-out',
        slow: '500ms ease-in-out'
      },
      hover: {
        scale: 1.02,
        shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
      }
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]

export const mockBranding: Branding[] = [
  {
    id: 'branding-1',
    name: 'Default Brand',
    description: 'Standard branding for the platform',
    isDefault: true,
    logo: {
      primary: '/logo-primary.svg',
      secondary: '/logo-secondary.svg',
      favicon: '/favicon.ico',
      dimensions: {
        width: 120,
        height: 40
      },
      altText: 'Platform Logo'
    },
    favicon: '/favicon.ico',
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#F59E0B',
      neutral: '#6B7280'
    },
    fonts: {
      primary: 'Inter',
      secondary: 'Inter',
      weights: [300, 400, 500, 600, 700]
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]

export const mockTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Dashboard Layout',
    description: 'Standard dashboard with sidebar navigation',
    category: 'dashboard',
    thumbnail: '/templates/dashboard.png',
    components: [
      {
        id: 'header-1',
        type: 'header',
        props: { title: 'Dashboard', showBreadcrumbs: true },
        position: { x: 0, y: 0 },
        dimensions: { width: 1200, height: 64 }
      },
      {
        id: 'sidebar-1',
        type: 'sidebar',
        props: { navigation: ['overview', 'analytics', 'users'] },
        position: { x: 0, y: 64 },
        dimensions: { width: 280, height: 800 }
      },
      {
        id: 'content-1',
        type: 'content',
        props: { layout: 'grid', columns: 3 },
        position: { x: 280, y: 64 },
        dimensions: { width: 920, height: 800 }
      }
    ],
    layout: {
      type: 'grid',
      columns: 12,
      rows: 12,
      gap: '1rem',
      padding: '1rem'
    },
    isDefault: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]

export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Acme Corporation',
    domain: 'acme.example.com',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    settings: {
      themeId: 'theme-1',
      skinId: 'skin-1',
      brandingId: 'branding-1',
      customDomain: 'acme.com',
      features: ['dashboard', 'analytics', 'user-management']
    }
  },
  {
    id: 'tenant-2',
    name: 'TechStart Inc',
    domain: 'techstart.example.com',
    status: 'active',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    settings: {
      themeId: 'theme-2',
      skinId: 'skin-1',
      brandingId: 'branding-1',
      features: ['dashboard', 'basic-analytics']
    }
  }
]

export const mockData = {
  themes: mockThemes,
  skins: mockSkins,
  branding: mockBranding,
  templates: mockTemplates,
  tenants: mockTenants
}

