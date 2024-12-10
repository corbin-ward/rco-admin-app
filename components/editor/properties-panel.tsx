'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from 'lucide-react'

export function PropertiesPanel() {
  const [pages, setPages] = useState<string[]>(['Information', 'Officers', 'Roster', 'Documents'])
  const [newPage, setNewPage] = useState('')

  const addPage = () => {
    if (newPage.trim() && !pages.includes(newPage.trim())) {
      setPages([...pages, newPage.trim()])
      setNewPage('')
    }
  }

  const removePage = (pageToRemove: string) => {
    setPages(pages.filter(page => page !== pageToRemove))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="new-page">Add New Page</Label>
          <div className="flex mt-1">
            <Input
              id="new-page"
              value={newPage}
              onChange={(e) => setNewPage(e.target.value)}
              placeholder="Enter page name"
            />
            <Button onClick={addPage} className="ml-2">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label>Pages</Label>
          <ul className="mt-1 space-y-1">
            {pages.map((page, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{page}</span>
                {!['Information', 'Officers', 'Roster', 'Documents'].includes(page) && (
                  <Button variant="ghost" size="sm" onClick={() => removePage(page)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

