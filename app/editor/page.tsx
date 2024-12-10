'use client'

import { useState } from 'react'
import { OrganizationTree } from '@/components/editor/organization-tree'
import { PropertiesPanel } from '@/components/editor/properties-panel'
import { EditorView } from '@/components/editor/editor-view'
import { ChevronLeft, ChevronRight, List, Cog } from 'lucide-react'
import { getAllOrganizations, getOrganizationBySlug } from "@/lib/data/organizations"
import { OrganizationDetails } from "@/lib/types"
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"

const organizationsData = getAllOrganizations()

const treeData = [
  {
    id: '1',
    name: 'Organizations',
    type: 'folder' as const,
    children: organizationsData.map(org => ({
      id: org.id.toString(),
      name: org.name,
      type: 'file' as const,
      slug: org.slug
    }))
  }
]

export default function EditorPage() {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDetails | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const handleOrganizationSelect = (slug: string) => {
    const org = getOrganizationBySlug(slug)
    if (org) {
      setSelectedOrganization(org)
      if (!isDesktop) {
        setIsDropdownOpen(false)
      }
    }
  }

  const OrganizationTreeComponent = (
    <OrganizationTree data={treeData} onSelect={handleOrganizationSelect} />
  )

  const NoOrganizationSelectedMessage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Select an organization to edit</h2>
      {!isDesktop && (
        <p className="text-sm text-gray-500">
          Press the list icon <List className="inline h-4 w-4" /> in the bottom left corner to choose an organization
        </p>
      )}
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {isDesktop ? (
        <>
          <div className="lg:w-64 p-4">
            {OrganizationTreeComponent}
          </div>
          <div className="flex-grow overflow-auto p-4 flex justify-center">
            <div className="w-full max-w-[1000px]">
              {selectedOrganization ? (
                <EditorView organization={selectedOrganization} />
              ) : (
                <NoOrganizationSelectedMessage />
              )}
            </div>
          </div>
          <div className="lg:w-64 p-4">
            <PropertiesPanel />
          </div>
        </>
      ) : (
        <>
          <Sheet open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed left-4 bottom-4 z-50 bg-black hover:bg-gray-800 text-white rounded-full p-3 [&>svg]:text-white">
                <List className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Organizations</SheetTitle>
              <div className="py-4">
                {OrganizationTreeComponent}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-grow overflow-auto p-4 flex justify-center">
            <div className="w-full max-w-[1000px]">
              {selectedOrganization ? (
                <EditorView organization={selectedOrganization} />
              ) : (
                <NoOrganizationSelectedMessage />
              )}
            </div>
          </div>
          <Sheet open={isRightPanelOpen} onOpenChange={setIsRightPanelOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed right-4 bottom-4 z-50 bg-black hover:bg-gray-800 text-white rounded-full p-3 [&>svg]:text-white">
                <Cog className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Properties</SheetTitle>
              <div className="py-4">
                <PropertiesPanel />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
      <Toaster />
    </div>
  )
}

