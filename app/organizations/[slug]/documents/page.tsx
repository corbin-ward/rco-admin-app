import { getOrganizationBySlug } from "@/lib/data/organizations"
import { notFound } from "next/navigation"
import { DocumentsSection } from "@/components/organization/documents-section"

export default function DocumentsPage({ params }: { params: { slug: string } }) {
  const organization = getOrganizationBySlug(params.slug)

  if (!organization) {
    notFound()
  }

  return (
    <DocumentsSection
      documents={organization.documents}
      isEditing={false}
      onUpdate={() => {}}
    />
  )
}

