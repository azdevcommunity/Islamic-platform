"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, FolderOpen, Folder, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CategoryTreeSelector({ categories, selectedCategories = [], onSelectionChange }) {
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  const [categoryTree, setCategoryTree] = useState([])
  const [localSelectedCategories, setLocalSelectedCategories] = useState(selectedCategories)
  const [renderKey, setRenderKey] = useState(0)

  // Sync local state with props
  useEffect(() => {
    setLocalSelectedCategories(selectedCategories)
  }, [selectedCategories])

  // Build tree structure from flat array
  useEffect(() => {
    if (!categories) return

    const buildTree = (items, parentId = null) => {
      return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
          ...item,
          children: buildTree(items, item.id)
        }))
    }

    const tree = buildTree(categories)
    setCategoryTree(tree)

    // Expand all nodes by default
    const getAllNodeIds = (nodes) => {
      const ids = []
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          ids.push(node.id)
          ids.push(...getAllNodeIds(node.children))
        }
      })
      return ids
    }

    const allNodeIds = getAllNodeIds(tree)
    setExpandedNodes(new Set(allNodeIds))
  }, [categories])

  const toggleExpanded = (nodeId, event) => {
    event.preventDefault()
    event.stopPropagation()
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleCategoryToggle = (categoryId, event) => {
    event.preventDefault()
    event.stopPropagation()
    
    const currentSelection = localSelectedCategories || []
    const isCurrentlySelected = currentSelection.includes(categoryId)
    
    let newSelection
    if (isCurrentlySelected) {
      // Remove from selection
      newSelection = currentSelection.filter(id => id !== categoryId)
    } else {
      // Add to selection
      newSelection = [...currentSelection, categoryId]
    }
    
    // Update local state immediately for UI responsiveness
    setLocalSelectedCategories(newSelection)
    
    // Force re-render
    setRenderKey(prev => prev + 1)
    
    // Call the parent's selection change handler
    if (onSelectionChange) {
      onSelectionChange(newSelection)
    }
  }

  const renderTreeNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isSelected = localSelectedCategories && localSelectedCategories.includes(node.id)

    return (
      <div key={`category-${node.id}`} className="select-none">
        <div 
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 ${
            isSelected ? "bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800" : ""
          }`}
          style={{ marginLeft: `${level * 20}px` }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => toggleExpanded(node.id, e)}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              )}
            </button>
          ) : (
            <div className="w-6" /> // Spacer for alignment
          )}

          {/* Folder Icon */}
          <div className="flex-shrink-0">
            {hasChildren ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              ) : (
                <Folder className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              )
            ) : (
              <div className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-600" />
            )}
          </div>

          {/* Checkbox */}
          <input
            key={`checkbox-${node.id}-${isSelected ? 'checked' : 'unchecked'}`}
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleCategoryToggle(node.id, e)}
            className="h-4 w-4 rounded border-2 border-slate-300 text-amber-600 focus:ring-amber-500 focus:ring-2"
          />

          {/* Category Name */}
          <span 
            className={`text-sm font-medium flex-1 ${
              isSelected ? "text-amber-700 dark:text-amber-300" : "text-slate-700 dark:text-slate-300"
            }`}
            onClick={(e) => handleCategoryToggle(node.id, e)}
          >
            {node.name}
          </span>

          {/* Selected Indicator */}
          {isSelected && (
            <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const getSelectedCategoryNames = () => {
    if (!categories) return []
    return categories
      .filter(cat => localSelectedCategories.includes(cat.id))
      .map(cat => cat.name)
  }

  return (
    <div className="space-y-4">
      {/* Tree Structure */}
      <div key={renderKey} className="max-h-80 overflow-y-auto border rounded-lg p-4 bg-white dark:bg-slate-900">
        {categoryTree.length > 0 ? (
          <div className="space-y-1">
            {categoryTree.map(node => renderTreeNode(node))}
          </div>
        ) : (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            Kateqoriyalar yüklənir...
          </div>
        )}
      </div>

      {/* Selected Categories Display */}
      {localSelectedCategories.length > 0 && (
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Seçilmiş kateqoriyalar ({localSelectedCategories.length}):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {getSelectedCategoryNames().map((name, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/50"
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}