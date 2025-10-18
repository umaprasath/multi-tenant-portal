'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Palette, 
  Layout, 
  Image, 
  FileText, 
  Users, 
  Settings, 
  ChevronRight,
  Dashboard
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Dashboard,
    current: true
  },
  {
    name: 'Themes',
    href: '/admin/themes',
    icon: Palette,
    current: false
  },
  {
    name: 'Skins',
    href: '/admin/skins',
    icon: Layout,
    current: false
  },
  {
    name: 'Branding',
    href: '/admin/branding',
    icon: Image,
    current: false
  },
  {
    name: 'Templates',
    href: '/admin/templates',
    icon: FileText,
    current: false
  },
  {
    name: 'Tenants',
    href: '/admin/tenants',
    icon: Users,
    current: false
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    current: false
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className={cn(
              "w-4 h-4 transition-transform",
              isCollapsed && "rotate-180"
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>Portal Admin v1.0</p>
              <p>Multi-Tenant Platform</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

