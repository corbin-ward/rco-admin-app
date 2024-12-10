'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react'
import { cn } from "@/lib/utils"
import { OrganizationDetails } from "@/lib/types"

interface TreeNode {
  id: string
  name: string
  type: 'folder' | 'file'
  children?: TreeNode[]
  slug?: string
}

interface OrganizationTreeProps {
  data: TreeNode[]
  onSelect: (slug: string) => void
}

const TreeNode = ({ node, level = 0, onSelect }: { node: TreeNode; level?: number; onSelect: (slug: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  const hasChildren = node.children && node.children.length > 0

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    } else if (node.slug) {
      onSelect(node.slug)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer",
          level > 0 && "ml-4"
        )}
        onClick={handleClick}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        ) : (
          <span className="w-4 mr-1" />
        )}
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4 mr-2 text-blue-500" />
        ) : (
          <File className="w-4 h-4 mr-2 text-gray-500" />
        )}
        <span>{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export function OrganizationTree({ data, onSelect }: OrganizationTreeProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Organizations</h3>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={onSelect} />
      ))}
    </div>
  )
}

