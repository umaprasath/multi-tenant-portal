'use client'

import { useState } from 'react'
import { Plus, Edit, Eye, Copy, Trash2, Settings, Globe, Users, Activity } from 'lucide-react'
import { mockTenants, mockThemes, mockSkins, mockBranding } from '@/lib/mock-data'
import { Tenant, Theme, Skin, Branding } from '@/types'
import { cn, formatDate, generateId } from '@/lib/utils'

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleCreateTenant = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsEditModalOpen(true)
  }

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsViewModalOpen(true)
  }

  const handleTenantSettings = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsSettingsModalOpen(true)
  }

  const handleDuplicateTenant = (tenant: Tenant) => {
    const newTenant: Tenant = {
      ...tenant,
      id: `tenant-${Date.now()}`,
      name: `${tenant.name} (Copy)`,
      domain: `${tenant.domain}-copy`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTenants([...tenants, newTenant])
  }

  const handleDeleteTenant = (tenantId: string) => {
    if (confirm('Are you sure you want to delete this tenant? This action cannot be undone.')) {
      setTenants(tenants.filter(t => t.id !== tenantId))
    }
  }

  const handleStatusChange = (tenantId: string, status: 'active' | 'inactive' | 'suspended') => {
    setTenants(tenants.map(t => 
      t.id === tenantId ? { ...t, status, updatedAt: new Date() } : t
    ))
  }

  const handleSettingsUpdate = (tenantId: string, settings: Partial<Tenant['settings']>) => {
    setTenants(tenants.map(t => 
      t.id === tenantId ? { 
        ...t, 
        settings: { ...t.settings, ...settings },
        updatedAt: new Date()
      } : t
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getThemeById = (themeId: string) => mockThemes.find(t => t.id === themeId)
  const getSkinById = (skinId: string) => mockSkins.find(s => s.id === skinId)
  const getBrandingById = (brandingId: string) => mockBranding.find(b => b.id === brandingId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600">Manage multi-tenant organizations and their configurations</p>
        </div>
        <button
          onClick={handleCreateTenant}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Tenant
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenants.filter(t => t.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenants.filter(t => t.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenants.filter(t => t.status === 'suspended').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Tenants</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Theme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenants.map((tenant) => {
                const theme = getThemeById(tenant.settings.themeId)
                const skin = getSkinById(tenant.settings.skinId)
                const branding = getBrandingById(tenant.settings.brandingId)
                
                return (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {tenant.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                          <div className="text-sm text-gray-500">{tenant.settings.features.length} features</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{tenant.domain}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={tenant.status}
                        onChange={(e) => handleStatusChange(tenant.id, e.target.value as any)}
                        className={cn(
                          "inline-flex px-2 py-1 text-xs font-medium rounded-full",
                          getStatusColor(tenant.status)
                        )}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>{theme?.name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{skin?.name} • {branding?.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(tenant.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewTenant(tenant)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditTenant(tenant)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit Tenant"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleTenantSettings(tenant)}
                          className="text-green-600 hover:text-green-900"
                          title="Configure Settings"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateTenant(tenant)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Duplicate Tenant"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTenant(tenant.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Tenant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Tenant Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Tenant</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tenant name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tenant.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Domain (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="customdomain.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {['dashboard', 'analytics', 'user-management', 'reports', 'integrations'].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{feature.replace('-', ' ')}</span>
                    </label>
                  ))}
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
                Create Tenant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tenant Modal */}
      {isEditModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Tenant: {selectedTenant.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedTenant.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <input
                  type="text"
                  defaultValue={selectedTenant.domain}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Domain
                </label>
                <input
                  type="text"
                  defaultValue={selectedTenant.settings.customDomain || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="customdomain.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select 
                  defaultValue={selectedTenant.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
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

      {/* Tenant Settings Modal */}
      {isSettingsModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Configure Settings: {selectedTenant.name}</h2>
            <div className="space-y-6">
              {/* Theme Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Theme Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select 
                      defaultValue={selectedTenant.settings.themeId}
                      onChange={(e) => handleSettingsUpdate(selectedTenant.id, { themeId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mockThemes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                          {theme.name} {theme.isDefault && '(Default)'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skin</label>
                    <select 
                      defaultValue={selectedTenant.settings.skinId}
                      onChange={(e) => handleSettingsUpdate(selectedTenant.id, { skinId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mockSkins.map((skin) => (
                        <option key={skin.id} value={skin.id}>
                          {skin.name} {skin.isDefault && '(Default)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Branding Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Branding Configuration</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branding Set</label>
                  <select 
                    defaultValue={selectedTenant.settings.brandingId}
                    onChange={(e) => handleSettingsUpdate(selectedTenant.id, { brandingId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {mockBranding.map((branding) => (
                      <option key={branding.id} value={branding.id}>
                        {branding.name} {branding.isDefault && '(Default)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Feature Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['dashboard', 'analytics', 'user-management', 'reports', 'integrations', 'customization'].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTenant.settings.features.includes(feature)}
                        onChange={(e) => {
                          const currentFeatures = selectedTenant.settings.features
                          const newFeatures = e.target.checked
                            ? [...currentFeatures, feature]
                            : currentFeatures.filter(f => f !== feature)
                          handleSettingsUpdate(selectedTenant.id, { features: newFeatures })
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{feature.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-6">
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Tenant Modal */}
      {isViewModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tenant Details: {selectedTenant.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedTenant.name}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Domain:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedTenant.domain}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Custom Domain:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedTenant.settings.customDomain || 'Not set'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={cn(
                      "ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full",
                      getStatusColor(selectedTenant.status)
                    )}>
                      {selectedTenant.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Created:</span>
                    <span className="ml-2 text-sm text-gray-900">{formatDate(selectedTenant.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Updated:</span>
                    <span className="ml-2 text-sm text-gray-900">{formatDate(selectedTenant.updatedAt)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Theme:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {getThemeById(selectedTenant.settings.themeId)?.name || 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Skin:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {getSkinById(selectedTenant.settings.skinId)?.name || 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Branding:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {getBrandingById(selectedTenant.settings.brandingId)?.name || 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Features:</span>
                    <div className="mt-1">
                      {selectedTenant.settings.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md mr-2 mb-1"
                        >
                          {feature.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-6">
              <button
                onClick={() => setIsViewModalOpen(false)}
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

