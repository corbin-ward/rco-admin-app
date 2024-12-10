'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrganizationDetails } from "@/lib/types"
import { Edit } from 'lucide-react'
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InformationSection } from '../organization/information-section'
import { OfficersSection } from '../organization/officers-section'
import { RosterSection } from '../organization/roster-section'
import { DocumentsSection } from '../organization/documents-section'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface EditorViewProps {
  organization: OrganizationDetails | null
}

export function EditorView({ organization }: EditorViewProps) {
  const { toast } = useToast()
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [editedOrg, setEditedOrg] = useState<OrganizationDetails | null>(organization)
  const [isSticky, setIsSticky] = useState(false)
  const stickyRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setEditedOrg(organization)
  }, [organization])

  useEffect(() => {
    const sticky = stickyRef.current
    const placeholder = placeholderRef.current
    if (!sticky || !placeholder) return

    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1)
      },
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" }
    )

    observer.observe(placeholder)

    return () => {
      observer.unobserve(placeholder)
    }
  }, [])

  if (!editedOrg) {
    return <div className="p-4">Select an organization to edit</div>
  }

  const handleInputChange = (field: keyof OrganizationDetails, value: string) => {
    setEditedOrg(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handleImageUpload = (field: 'banner' | 'icon') => {
    // This is a placeholder for image upload functionality
    console.log(`Uploading ${field} image`)
  }

  const handleAddTag = (tag: string) => {
    setEditedOrg(prev => {
      if (!prev) return null;
      return { ...prev, tags: [...prev.tags, tag] };
    });
  }

  const handleRemoveTag = (index: number) => {
    setEditedOrg(prev => {
      if (!prev) return null;
      const newTags = prev.tags.filter((_, i) => i !== index);
      return { ...prev, tags: newTags };
    });
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="bg-white rounded-lg shadow">
        <div ref={placeholderRef} className="h-[56px] -mb-[56px]" />
        <div
          ref={stickyRef}
          className={`sticky top-0 z-10 bg-white transition-shadow duration-200 ${
            isSticky ? 'shadow-md' : ''
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">{editedOrg.name} Editor</h2>
          <div className="flex gap-2 max-w-3xl mx-auto p-4">
            <Button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex-1"
            >
              {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
            </Button>
            <Button className="flex-1" onClick={() => {
  // Here you would typically save the changes to your backend
  // For now, we'll just show the toast
  toast({
    title: "Changes saved",
    description: "Your changes have been successfully saved.",
  })
}}>
              Save Changes
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative mb-8">
            <Image
              src={editedOrg.banner}
              alt={`${editedOrg.name} banner`}
              width={1000}
              height={300}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
            <div className="absolute bottom-4 left-4 flex items-end">
              <div className="relative">
                <Image
                  src={editedOrg.icon}
                  alt={editedOrg.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white mr-4"
                />
                {!isPreviewMode && (
                  <Button onClick={() => handleImageUpload('icon')} className="absolute bottom-0 right-0 p-1">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{editedOrg.name}</h1>
                <p className="text-xl">{editedOrg.type}</p>
                <p>
                  Founded: {editedOrg.foundingDate.getFullYear()} | Members: {editedOrg.memberCount}
                </p>
              </div>
            </div>
            {!isPreviewMode && (
              <Button onClick={() => handleImageUpload('banner')} className="absolute top-2 right-2">
                <Edit className="mr-2 h-4 w-4" /> Edit Banner
              </Button>
            )}
          </div>
          <Tabs defaultValue="information">
            <TabsList>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="officers">Officers</TabsTrigger>
              <TabsTrigger value="roster">Roster</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="information">
              <InformationSection
                organization={editedOrg}
                isEditing={!isPreviewMode}
                onUpdate={handleInputChange}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
            </TabsContent>
            <TabsContent value="officers">
              <OfficersSection
                officers={editedOrg.officers}
                members={editedOrg.members}
                isEditing={!isPreviewMode}
                onUpdate={(updatedOfficers) => setEditedOrg(prev => prev ? {...prev, officers: updatedOfficers} : null)}
              />
            </TabsContent>
            <TabsContent value="roster">
              <RosterSection
                members={editedOrg.members}
                isEditing={!isPreviewMode}
                onUpdate={(updatedMembers) => setEditedOrg(prev => prev ? {...prev, members: updatedMembers} : null)}
              />
            </TabsContent>
            <TabsContent value="documents">
              <DocumentsSection
                documents={editedOrg.documents}
                isEditing={!isPreviewMode}
                onUpdate={(updatedDocuments) => setEditedOrg(prev => prev ? {...prev, documents: updatedDocuments} : null)}
              />
            </TabsContent>
          </Tabs>
        </div>
      <Toaster />
      </div>
    </div>
  )
}

