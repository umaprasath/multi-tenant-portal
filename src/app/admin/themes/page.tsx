'use client'

import { useState } from 'react'
import { Plus, Edit, Eye, Copy, Trash2, Palette } from 'lucide-react'
import { mockThemes } from '@/lib/mock-data'
import { Theme } from '@/types'
import { cn, formatDate } from '@/lib/utils'

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>(mockThemes)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  const handleCreateTheme = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditTheme = (theme: Theme) => {
    setSelectedTheme(theme)
    setIsEditModalOpen(true)
  }

  const handlePreviewTheme = (theme: Theme) => {
    setSelectedTheme(theme)
    setIsPreviewModalOpen(true)
  }

  const handleDuplicateTheme = (theme: Theme) => {
    const newTheme: Theme = {
      ...theme,
      id: `theme-${Date.now()}`,
      name: `${theme.name} (Copy)`,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setThemes([...themes, newTheme])
  }

  const handleDeleteTheme = (themeId: string) => {
    if (confirm('Are you sure you want to delete this theme?')) {
      setThemes(themes.filter(t => t.id !== themeId))
    }
  }

  const handleSetDefault = (themeId: string) => {
    setThemes(themes.map(t => ({
      ...t,
      isDefault: t.id === themeId
    })))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Theme Management</h1>
          <p className="text-gray-600">Create and manage themes for your multi-tenant portal</p>
        </div>
        <button
          onClick={handleCreateTheme}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Theme
        </button>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div key={theme.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Theme Preview */}
            <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">{theme.name}</span>
                </div>
                {theme.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                )}
              </div>
              
              {/* Color Palette Preview */}
              <div className="mt-4 flex space-x-2">
                <div 
                  className="w-6 h-6 rounded border border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className="w-6 h-6 rounded border border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className="w-6 h-6 rounded border border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <div 
                  className="w-6 h-6 rounded border border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.background }}
                />
              </div>
            </div>

            {/* Theme Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{theme.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
              
              <div className="text-xs text-gray-500 mb-4">
                <p>Created: {formatDate(theme.createdAt)}</p>
                <p>Updated: {formatDate(theme.updatedAt)}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewTheme(theme)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleEditTheme(theme)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicateTheme(theme)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {!theme.isDefault && (
                  <button
                    onClick={() => handleDeleteTheme(theme.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {!theme.isDefault && (
                <button
                  onClick={() => handleSetDefault(theme.id)}
                  className="w-full mt-3 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Theme Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Theme</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter theme name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter theme description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-md"
                    defaultValue="#3B82F6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-md"
                    defaultValue="#64748B"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Create Theme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Theme Modal */}
      {isEditModalOpen && selectedTheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Theme: {selectedTheme.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedTheme.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedTheme.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    defaultValue={selectedTheme.colors.primary}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    defaultValue={selectedTheme.colors.secondary}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Theme Modal */}
      {isPreviewModalOpen && selectedTheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Theme Preview: {selectedTheme.name}</h2>
            <div className="space-y-6">
              {/* Color Palette */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Color Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedTheme.colors).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border border-gray-200 mx-auto mb-2"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-xs text-gray-600 capitalize">{key}</p>
                      <p className="text-xs font-mono text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Typography</h3>
                <div className="space-y-2">
                  <p style={{ fontFamily: selectedTheme.typography.fontFamily.primary, fontSize: selectedTheme.typography.fontSize['4xl'], fontWeight: selectedTheme.typography.fontWeight.bold }}>
                    Heading 1 - {selectedTheme.typography.fontFamily.primary}
                  </p>
                  <p style={{ fontFamily: selectedTheme.typography.fontFamily.primary, fontSize: selectedTheme.typography.fontSize['2xl'], fontWeight: selectedTheme.typography.fontWeight.semibold }}>
                    Heading 2 - {selectedTheme.typography.fontFamily.primary}
                  </p>
                  <p style={{ fontFamily: selectedTheme.typography.fontFamily.primary, fontSize: selectedTheme.typography.fontSize.base, fontWeight: selectedTheme.typography.fontWeight.normal }}>
                    Body text - {selectedTheme.typography.fontFamily.primary}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-6">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

