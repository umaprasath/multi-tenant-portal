'use client'

import { useState, useCallback } from 'react'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent
} from '@dnd-kit/core'
import { 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable'
import { 
  Plus, 
  Save, 
  Eye, 
  Download, 
  Settings,
  Type,
  Image,
  Layout,
  Square,
  Circle,
  Triangle
} from 'lucide-react'
import { Template, TemplateComponent } from '@/types'
import { mockTemplates } from '@/lib/mock-data'
import { cn, generateId } from '@/lib/utils'

const componentLibrary = [
  {
    id: 'header',
    name: 'Header',
    icon: Layout,
    type: 'header',
    defaultProps: {
      title: 'Page Header',
      showBreadcrumbs: true,
      actions: []
    },
    defaultDimensions: { width: 1200, height: 64 }
  },
  {
    id: 'hero',
    name: 'Hero Section',
    icon: Square,
    type: 'hero',
    defaultProps: {
      title: 'Welcome to Our Platform',
      subtitle: 'Discover amazing features and possibilities',
      ctaText: 'Get Started',
      ctaLink: '#'
    },
    defaultDimensions: { width: 1200, height: 400 }
  },
  {
    id: 'content',
    name: 'Content Block',
    icon: Type,
    type: 'content',
    defaultProps: {
      title: 'Content Title',
      content: 'This is a content block with rich text support.',
      layout: 'single-column'
    },
    defaultDimensions: { width: 800, height: 300 }
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    icon: Layout,
    type: 'sidebar',
    defaultProps: {
      navigation: ['Home', 'About', 'Contact'],
      position: 'left'
    },
    defaultDimensions: { width: 280, height: 600 }
  },
  {
    id: 'footer',
    name: 'Footer',
    icon: Layout,
    type: 'footer',
    defaultProps: {
      links: ['Privacy', 'Terms', 'Support'],
      copyright: '© 2024 Your Company'
    },
    defaultDimensions: { width: 1200, height: 100 }
  }
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<TemplateComponent | null>(null)
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    console.log('Drag started:', active.id)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    console.log('Drag over:', { active: active.id, over: over?.id })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      // Handle component placement on canvas
      if (selectedTemplate) {
        const componentData = componentLibrary.find(c => c.id === active.id)
        if (componentData) {
          const newComponent: TemplateComponent = {
            id: generateId(),
            type: componentData.type as any,
            props: { ...componentData.defaultProps },
            position: { x: 0, y: 0 },
            dimensions: { ...componentData.defaultDimensions }
          }

          setSelectedTemplate({
            ...selectedTemplate,
            components: [...selectedTemplate.components, newComponent]
          })
        }
      }
    }
  }

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: generateId(),
      name: 'New Template',
      description: 'A new template for your portal',
      category: 'custom',
      thumbnail: '/templates/new.png',
      components: [],
      layout: {
        type: 'grid',
        columns: 12,
        rows: 12,
        gap: '1rem',
        padding: '1rem'
      },
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTemplates([...templates, newTemplate])
    setSelectedTemplate(newTemplate)
    setIsBuilderOpen(true)
  }

  const handleOpenBuilder = (template: Template) => {
    setSelectedTemplate(template)
    setIsBuilderOpen(true)
  }

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id ? selectedTemplate : t
      ))
      setIsBuilderOpen(false)
    }
  }

  const handleComponentSelect = (component: TemplateComponent) => {
    setSelectedComponent(component)
  }

  const handleComponentUpdate = (componentId: string, updates: Partial<TemplateComponent>) => {
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        components: selectedTemplate.components.map(c =>
          c.id === componentId ? { ...c, ...updates } : c
        )
      })
    }
  }

  const handleComponentDelete = (componentId: string) => {
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        components: selectedTemplate.components.filter(c => c.id !== componentId)
      })
      setSelectedComponent(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Builder</h1>
          <p className="text-gray-600">Create and manage templates for your multi-tenant portal</p>
        </div>
        <button
          onClick={handleCreateTemplate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </button>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-purple-50 to-pink-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layout className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">{template.name}</span>
                </div>
                {template.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                )}
              </div>
              <div className="mt-4 text-xs text-purple-700">
                {template.components.length} components
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenBuilder(template)}
                  className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Open Builder
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Builder Modal */}
      {isBuilderOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-7xl h-[90vh] flex flex-col">
            {/* Builder Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Template Builder: {selectedTemplate.name}
                </h2>
                <input
                  type="text"
                  value={selectedTemplate.name}
                  onChange={(e) => setSelectedTemplate({
                    ...selectedTemplate,
                    name: e.target.value
                  })}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Builder Content */}
            <div className="flex-1 flex">
              {/* Component Library */}
              <div className="w-64 border-r border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Components</h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                >
                  <div className="space-y-2">
                    {componentLibrary.map((component) => (
                      <div
                        key={component.id}
                        className="p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 cursor-move"
                        draggable
                      >
                        <div className="flex items-center space-x-2">
                          <component.icon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">{component.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </DndContext>
              </div>

              {/* Canvas */}
              <div className="flex-1 p-4 bg-gray-50">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[600px] relative">
                  {selectedTemplate.components.map((component) => (
                    <div
                      key={component.id}
                      onClick={() => handleComponentSelect(component)}
                      className={cn(
                        "absolute border-2 cursor-pointer transition-all",
                        selectedComponent?.id === component.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                      style={{
                        left: component.position.x,
                        top: component.position.y,
                        width: component.dimensions.width,
                        height: component.dimensions.height
                      }}
                    >
                      <div className="p-2 text-xs text-gray-600 bg-gray-100 border-b border-gray-300">
                        {component.type}
                      </div>
                      <div className="p-2 text-xs text-gray-500">
                        {component.dimensions.width} × {component.dimensions.height}
                      </div>
                    </div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <p>Drag components here to build your template</p>
                  </div>
                </div>
              </div>

              {/* Properties Panel */}
              <div className="w-80 border-l border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Properties</h3>
                {selectedComponent ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Component Type
                      </label>
                      <input
                        type="text"
                        value={selectedComponent.type}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position X
                      </label>
                      <input
                        type="number"
                        value={selectedComponent.position.x}
                        onChange={(e) => handleComponentUpdate(selectedComponent.id, {
                          position: { ...selectedComponent.position, x: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position Y
                      </label>
                      <input
                        type="number"
                        value={selectedComponent.position.y}
                        onChange={(e) => handleComponentUpdate(selectedComponent.id, {
                          position: { ...selectedComponent.position, y: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Width
                      </label>
                      <input
                        type="number"
                        value={selectedComponent.dimensions.width}
                        onChange={(e) => handleComponentUpdate(selectedComponent.id, {
                          dimensions: { ...selectedComponent.dimensions, width: parseInt(e.target.value) || 100 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height
                      </label>
                      <input
                        type="number"
                        value={selectedComponent.dimensions.height}
                        onChange={(e) => handleComponentUpdate(selectedComponent.id, {
                          dimensions: { ...selectedComponent.dimensions, height: parseInt(e.target.value) || 100 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>

                    <button
                      onClick={() => handleComponentDelete(selectedComponent.id)}
                      className="w-full px-3 py-2 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    >
                      Delete Component
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Settings className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Select a component to edit its properties</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Template Preview: {selectedTemplate.name}
              </h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
            <div className="flex-1 p-4 bg-gray-50 overflow-auto">
              <div className="bg-white rounded-lg shadow-lg mx-auto" style={{ maxWidth: '1200px' }}>
                {selectedTemplate.components.map((component) => (
                  <div
                    key={component.id}
                    className="border border-gray-200 bg-gray-50 p-4 text-center"
                    style={{
                      width: component.dimensions.width,
                      height: component.dimensions.height
                    }}
                  >
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Component
                    </div>
                    <div className="text-xs text-gray-500">
                      {component.dimensions.width} × {component.dimensions.height}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

