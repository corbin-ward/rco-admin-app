import { getOrganizationBySlug } from "@/lib/data/organizations"
import { notFound } from "next/navigation"
import { RosterSection } from "@/components/organization/roster-section"

export default function RosterPage({ params }: { params: { slug: string } }) {
  const organization = getOrganizationBySlug(params.slug)

  if (!organization) {
    notFound()
  }

  return (
    <RosterSection
      members={organization.members}
      isEditing={false}
      onUpdate={() => {}}
    />
  )
}

