'use client'

import { useState } from 'react'
import { Plus, Edit, Eye, Copy, Trash2, Layout, Settings, Palette, Zap } from 'lucide-react'
import { mockSkins } from '@/lib/mock-data'
import { Skin } from '@/types'
import { cn, formatDate } from '@/lib/utils'

export default function SkinsPage() {
  const [skins, setSkins] = useState<Skin[]>(mockSkins)
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  const handleCreateSkin = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditSkin = (skin: Skin) => {
    setSelectedSkin(skin)
    setIsEditModalOpen(true)
  }

  const handlePreviewSkin = (skin: Skin) => {
    setSelectedSkin(skin)
    setIsPreviewModalOpen(true)
  }

  const handleDuplicateSkin = (skin: Skin) => {
    const newSkin: Skin = {
      ...skin,
      id: `skin-${Date.now()}`,
      name: `${skin.name} (Copy)`,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setSkins([...skins, newSkin])
  }

  const handleDeleteSkin = (skinId: string) => {
    if (confirm('Are you sure you want to delete this skin?')) {
      setSkins(skins.filter(s => s.id !== skinId))
    }
  }

  const handleSetDefault = (skinId: string) => {
    setSkins(skins.map(s => ({
      ...s,
      isDefault: s.id === skinId
    })))
  }

  const handleLayoutUpdate = (skinId: string, layoutUpdates: Partial<Skin['layout']>) => {
    setSkins(skins.map(s => 
      s.id === skinId ? {
        ...s,
        layout: { ...s.layout, ...layoutUpdates },
        updatedAt: new Date()
      } : s
    ))
  }

  const handleComponentUpdate = (skinId: string, componentUpdates: Partial<Skin['components']>) => {
    setSkins(skins.map(s => 
      s.id === skinId ? {
        ...s,
        components: { ...s.components, ...componentUpdates },
        updatedAt: new Date()
      } : s
    ))
  }

  const handleAnimationUpdate = (skinId: string, animationUpdates: Partial<Skin['animations']>) => {
    setSkins(skins.map(s => 
      s.id === skinId ? {
        ...s,
        animations: { ...s.animations, ...animationUpdates },
        updatedAt: new Date()
      } : s
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skin Management</h1>
          <p className="text-gray-600">Configure layout, components, and animations for your multi-tenant portal</p>
        </div>
        <button
          onClick={handleCreateSkin}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Skin
        </button>
      </div>

      {/* Skins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skins.map((skin) => (
          <div key={skin.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Skin Preview */}
            <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layout className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">{skin.name}</span>
                </div>
                {skin.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                )}
              </div>
              
              {/* Layout Preview */}
              <div className="mt-4 flex items-center justify-center">
                <div className="w-20 h-16 bg-white rounded-lg border border-gray-200 p-2">
                  <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
                  <div className="flex space-x-1">
                    <div className="w-6 h-10 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-gray-300 rounded mt-1"></div>
                </div>
              </div>
            </div>

            {/* Skin Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{skin.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{skin.description}</p>
              
              {/* Layout Info */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Layout</p>
                <div className="text-xs text-gray-700 space-y-1">
                  <div>Sidebar: {skin.layout.sidebar.position} ({skin.layout.sidebar.width})</div>
                  <div>Header: {skin.layout.header.height} {skin.layout.header.sticky && '(sticky)'}</div>
                  <div>Footer: {skin.layout.footer.visible ? 'Visible' : 'Hidden'}</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                <p>Created: {formatDate(skin.createdAt)}</p>
                <p>Updated: {formatDate(skin.updatedAt)}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewSkin(skin)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleEditSkin(skin)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicateSkin(skin)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {!skin.isDefault && (
                  <button
                    onClick={() => handleDeleteSkin(skin.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {!skin.isDefault && (
                <button
                  onClick={() => handleSetDefault(skin.id)}
                  className="w-full mt-3 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Skin Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Skin</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skin Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter skin name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter skin description"
                />
              </div>
              
              {/* Layout Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Layout Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Position</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Width</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="280px"
                      defaultValue="280px"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Height</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="64px"
                      defaultValue="64px"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Max Width</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1200px"
                      defaultValue="1200px"
                    />
                  </div>
                </div>
              </div>

              {/* Component Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Component Styling</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Border Radius</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.5rem"
                      defaultValue="0.5rem"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Border Radius</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.75rem"
                      defaultValue="0.75rem"
                    />
                  </div>
                </div>
              </div>

              {/* Animation Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Animation Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fast Transition</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="150ms ease-in-out"
                      defaultValue="150ms ease-in-out"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Normal Transition</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="300ms ease-in-out"
                      defaultValue="300ms ease-in-out"
                    />
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
                Create Skin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Skin Modal */}
      {isEditModalOpen && selectedSkin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Skin: {selectedSkin.name}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skin Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedSkin.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedSkin.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              {/* Layout Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Layout Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Position</label>
                    <select 
                      defaultValue={selectedSkin.layout.sidebar.position}
                      onChange={(e) => handleLayoutUpdate(selectedSkin.id, {
                        sidebar: { ...selectedSkin.layout.sidebar, position: e.target.value as 'left' | 'right' }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Width</label>
                    <input
                      type="text"
                      value={selectedSkin.layout.sidebar.width}
                      onChange={(e) => handleLayoutUpdate(selectedSkin.id, {
                        sidebar: { ...selectedSkin.layout.sidebar, width: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Height</label>
                    <input
                      type="text"
                      value={selectedSkin.layout.header.height}
                      onChange={(e) => handleLayoutUpdate(selectedSkin.id, {
                        header: { ...selectedSkin.layout.header, height: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Max Width</label>
                    <input
                      type="text"
                      value={selectedSkin.layout.content.maxWidth}
                      onChange={(e) => handleLayoutUpdate(selectedSkin.id, {
                        content: { ...selectedSkin.layout.content, maxWidth: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Component Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Component Styling</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Border Radius</label>
                    <input
                      type="text"
                      value={selectedSkin.components.buttons.borderRadius}
                      onChange={(e) => handleComponentUpdate(selectedSkin.id, {
                        buttons: { ...selectedSkin.components.buttons, borderRadius: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Border Radius</label>
                    <input
                      type="text"
                      value={selectedSkin.components.cards.borderRadius}
                      onChange={(e) => handleComponentUpdate(selectedSkin.id, {
                        cards: { ...selectedSkin.components.cards, borderRadius: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Animation Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Animation Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fast Transition</label>
                    <input
                      type="text"
                      value={selectedSkin.animations.transitions.fast}
                      onChange={(e) => handleAnimationUpdate(selectedSkin.id, {
                        transitions: { ...selectedSkin.animations.transitions, fast: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Normal Transition</label>
                    <input
                      type="text"
                      value={selectedSkin.animations.transitions.normal}
                      onChange={(e) => handleAnimationUpdate(selectedSkin.id, {
                        transitions: { ...selectedSkin.animations.transitions, normal: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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

      {/* Preview Skin Modal */}
      {isPreviewModalOpen && selectedSkin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skin Preview: {selectedSkin.name}</h2>
            <div className="space-y-6">
              {/* Layout Preview */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Layout Preview</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '800px' }}>
                    {/* Header */}
                    <div 
                      className="bg-blue-600 text-white p-4 flex items-center justify-between"
                      style={{ height: selectedSkin.layout.header.height }}
                    >
                      <span className="font-semibold">Header</span>
                      <span className="text-sm opacity-75">{selectedSkin.layout.header.height}</span>
                    </div>
                    
                    <div className="flex">
                      {/* Sidebar */}
                      <div 
                        className={`bg-gray-100 p-4 ${selectedSkin.layout.sidebar.position === 'left' ? 'order-first' : 'order-last'}`}
                        style={{ width: selectedSkin.layout.sidebar.width }}
                      >
                        <div className="text-sm font-medium text-gray-700 mb-2">Sidebar</div>
                        <div className="text-xs text-gray-500">{selectedSkin.layout.sidebar.width}</div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="text-sm font-medium text-gray-700 mb-2">Content Area</div>
                        <div className="text-xs text-gray-500">Max width: {selectedSkin.layout.content.maxWidth}</div>
                        <div className="mt-4 space-y-3">
                          <div className="p-3 bg-white border rounded-lg" style={{ borderRadius: selectedSkin.components.cards.borderRadius }}>
                            <div className="text-sm">Card Component</div>
                            <div className="text-xs text-gray-500">Border radius: {selectedSkin.components.cards.borderRadius}</div>
                          </div>
                          <button 
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md"
                            style={{ borderRadius: selectedSkin.components.buttons.borderRadius }}
                          >
                            Button Component
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    {selectedSkin.layout.footer.visible && (
                      <div 
                        className="bg-gray-200 p-4 text-center text-sm text-gray-600"
                        style={{ height: selectedSkin.layout.footer.height }}
                      >
                        Footer - {selectedSkin.layout.footer.height}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Component Styling */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Component Styling</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Buttons</h4>
                    <div className="space-y-2">
                      <button 
                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md"
                        style={{ borderRadius: selectedSkin.components.buttons.borderRadius }}
                      >
                        Primary Button
                      </button>
                      <div className="text-xs text-gray-500">
                        Border radius: {selectedSkin.components.buttons.borderRadius}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Cards</h4>
                    <div className="p-3 bg-white border rounded-lg" style={{ borderRadius: selectedSkin.components.cards.borderRadius }}>
                      <div className="text-sm">Sample Card</div>
                      <div className="text-xs text-gray-500">
                        Border radius: {selectedSkin.components.cards.borderRadius}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Inputs</h4>
                    <input
                      type="text"
                      placeholder="Sample input"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      style={{ borderRadius: selectedSkin.components.inputs.borderRadius }}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Border radius: {selectedSkin.components.inputs.borderRadius}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animation Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Animation Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Transitions</h4>
                    <div className="space-y-2 text-sm">
                      <div>Fast: {selectedSkin.animations.transitions.fast}</div>
                      <div>Normal: {selectedSkin.animations.transitions.normal}</div>
                      <div>Slow: {selectedSkin.animations.transitions.slow}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Hover Effects</h4>
                    <div className="space-y-2 text-sm">
                      <div>Scale: {selectedSkin.animations.hover.scale}x</div>
                      <div>Shadow: {selectedSkin.animations.hover.shadow}</div>
                    </div>
                  </div>
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

