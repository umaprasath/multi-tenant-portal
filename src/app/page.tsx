'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Palette, Layout, Image, FileText, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin dashboard after a brief delay
    const timer = setTimeout(() => {
      router.push('/admin')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const features = [
    {
      icon: Users,
      title: 'Multi-Tenant Management',
      description: 'Manage multiple organizations with isolated configurations'
    },
    {
      icon: Palette,
      title: 'Theme Customization',
      description: 'Create and manage color schemes and typography'
    },
    {
      icon: Layout,
      title: 'Skin Configuration',
      description: 'Configure layouts, components, and animations'
    },
    {
      icon: Image,
      title: 'Branding Control',
      description: 'Manage logos, colors, and brand identity'
    },
    {
      icon: FileText,
      title: 'Template Builder',
      description: 'Drag-and-drop interface for building custom layouts'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Multi-Tenant Portal Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform for managing multi-tenant organizations with 
            customizable themes, skins, branding, and template building capabilities.
          </p>
          <div className="mt-8">
            <button
              onClick={() => router.push('/admin')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Admin Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-gray-500">
          <p>Redirecting to admin dashboard in 3 seconds...</p>
          <p className="mt-2">Or click the button above to go immediately.</p>
        </div>
      </div>
    </div>
  )
}
