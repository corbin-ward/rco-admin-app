import { getOrganizationBySlug } from "@/lib/data/organizations"
import { notFound } from "next/navigation"
import { OfficersSection } from "@/components/organization/officers-section"

export default function OfficersPage({ params }: { params: { slug: string } }) {
  const organization = getOrganizationBySlug(params.slug)

  if (!organization) {
    notFound()
  }

  return (
    <OfficersSection
      officers={organization.officers}
      members={organization.members}
      isEditing={false}
      onUpdate={() => {}}
    />
  )
}

