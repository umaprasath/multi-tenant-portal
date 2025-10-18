'use client'

import { useState, useRef } from 'react'
import { Plus, Edit, Eye, Copy, Trash2, Upload, Download, Palette, Type, Image as ImageIcon } from 'lucide-react'
import { mockBranding } from '@/lib/mock-data'
import { Branding } from '@/types'
import { cn, formatDate, validateHexColor } from '@/lib/utils'

export default function BrandingPage() {
  const [branding, setBranding] = useState<Branding[]>(mockBranding)
  const [selectedBranding, setSelectedBranding] = useState<Branding | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCreateBranding = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditBranding = (brandingItem: Branding) => {
    setSelectedBranding(brandingItem)
    setIsEditModalOpen(true)
  }

  const handlePreviewBranding = (brandingItem: Branding) => {
    setSelectedBranding(brandingItem)
    setIsPreviewModalOpen(true)
  }

  const handleDuplicateBranding = (brandingItem: Branding) => {
    const newBranding: Branding = {
      ...brandingItem,
      id: `branding-${Date.now()}`,
      name: `${brandingItem.name} (Copy)`,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setBranding([...branding, newBranding])
  }

  const handleDeleteBranding = (brandingId: string) => {
    if (confirm('Are you sure you want to delete this branding?')) {
      setBranding(branding.filter(b => b.id !== brandingId))
    }
  }

  const handleSetDefault = (brandingId: string) => {
    setBranding(branding.map(b => ({
      ...b,
      isDefault: b.id === brandingId
    })))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        // Handle logo upload - in real app, upload to server and get URL
        console.log('Logo uploaded:', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (colorKey: string, value: string) => {
    if (selectedBranding && validateHexColor(value)) {
      setSelectedBranding({
        ...selectedBranding,
        colors: {
          ...selectedBranding.colors,
          [colorKey]: value
        }
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branding Management</h1>
          <p className="text-gray-600">Manage logos, colors, and fonts for your multi-tenant portal</p>
        </div>
        <button
          onClick={handleCreateBranding}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Branding
        </button>
      </div>

      {/* Branding Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branding.map((brandingItem) => (
          <div key={brandingItem.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Branding Preview */}
            <div className="h-32 bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-900">{brandingItem.name}</span>
                </div>
                {brandingItem.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                )}
              </div>
              
              {/* Logo Preview */}
              <div className="mt-4 flex items-center justify-center">
                <div className="w-16 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
              </div>
            </div>

            {/* Branding Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{brandingItem.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{brandingItem.description}</p>
              
              {/* Color Palette Preview */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Color Palette</p>
                <div className="flex space-x-2">
                  {Object.entries(brandingItem.colors).map(([key, color]) => (
                    <div
                      key={key}
                      className="w-6 h-6 rounded border border-gray-200 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={`${key}: ${color}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                <p>Created: {formatDate(brandingItem.createdAt)}</p>
                <p>Updated: {formatDate(brandingItem.updatedAt)}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewBranding(brandingItem)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleEditBranding(brandingItem)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicateBranding(brandingItem)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {!brandingItem.isDefault && (
                  <button
                    onClick={() => handleDeleteBranding(brandingItem.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {!brandingItem.isDefault && (
                <button
                  onClick={() => handleSetDefault(brandingItem.id)}
                  className="w-full mt-3 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Branding Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Branding</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branding Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter branding name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter branding description"
                />
              </div>
              
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload your logo</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Palette
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Primary</label>
                    <input
                      type="color"
                      className="w-full h-10 border border-gray-300 rounded-md"
                      defaultValue="#3B82F6"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Secondary</label>
                    <input
                      type="color"
                      className="w-full h-10 border border-gray-300 rounded-md"
                      defaultValue="#64748B"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Accent</label>
                    <input
                      type="color"
                      className="w-full h-10 border border-gray-300 rounded-md"
                      defaultValue="#F59E0B"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Neutral</label>
                    <input
                      type="color"
                      className="w-full h-10 border border-gray-300 rounded-md"
                      defaultValue="#6B7280"
                    />
                  </div>
                </div>
              </div>

              {/* Fonts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fonts
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Primary Font</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Secondary Font</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
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
                Create Branding
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Branding Modal */}
      {isEditModalOpen && selectedBranding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Branding: {selectedBranding.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branding Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedBranding.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedBranding.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Current logo: {selectedBranding.logo.primary}</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Change Logo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Palette
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedBranding.colors).map(([key, color]) => (
                    <div key={key}>
                      <label className="block text-xs text-gray-600 mb-1 capitalize">{key}</label>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fonts
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Primary Font</label>
                    <select 
                      defaultValue={selectedBranding.fonts.primary}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Secondary Font</label>
                    <select 
                      defaultValue={selectedBranding.fonts.secondary}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
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

      {/* Preview Branding Modal */}
      {isPreviewModalOpen && selectedBranding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Branding Preview: {selectedBranding.name}</h2>
            <div className="space-y-6">
              {/* Logo Preview */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Logo & Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-32 h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-sm text-gray-500">Primary Logo</span>
                    </div>
                    <p className="text-xs text-gray-600">Primary Logo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-sm text-gray-500">Secondary Logo</span>
                    </div>
                    <p className="text-xs text-gray-600">Secondary Logo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-xs text-gray-500">Favicon</span>
                    </div>
                    <p className="text-xs text-gray-600">Favicon</p>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Color Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedBranding.colors).map(([key, color]) => (
                    <div key={key} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border border-gray-200 mx-auto mb-2"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-xs text-gray-600 capitalize">{key}</p>
                      <p className="text-xs font-mono text-gray-900">{color}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Typography</h3>
                <div className="space-y-2">
                  <p style={{ fontFamily: selectedBranding.fonts.primary, fontSize: '2rem', fontWeight: 600 }}>
                    Primary Font: {selectedBranding.fonts.primary}
                  </p>
                  <p style={{ fontFamily: selectedBranding.fonts.secondary, fontSize: '1.5rem', fontWeight: 400 }}>
                    Secondary Font: {selectedBranding.fonts.secondary}
                  </p>
                  <p style={{ fontFamily: selectedBranding.fonts.primary, fontSize: '1rem', fontWeight: 400 }}>
                    Body text example with {selectedBranding.fonts.primary} font family
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

