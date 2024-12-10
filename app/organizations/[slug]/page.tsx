import { getOrganizationBySlug } from "@/lib/data/organizations"
import { notFound } from "next/navigation"
import { InformationSection } from "@/components/organization/information-section"

export default function OrganizationPage({ params }: { params: { slug: string } }) {
  const organization = getOrganizationBySlug(params.slug)

  if (!organization) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <InformationSection
        organization={organization}
        isEditing={false}
        onUpdate={() => {}}
        onAddTag={() => {}}
        onRemoveTag={() => {}}
      />
    </div>
  )
}

