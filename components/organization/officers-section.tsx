import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { OrganizationOfficer } from "@/lib/types"
import { OfficerEditor } from '../editor/officer-editor'

interface OfficersSectionProps {
  officers: OrganizationOfficer[]
  members: any[] // Replace 'any' with the correct type for members
  isEditing: boolean
  onUpdate: (updatedOfficers: OrganizationOfficer[]) => void
}

export function OfficersSection({ officers, members, isEditing, onUpdate }: OfficersSectionProps) {
  const content = isEditing ? (
    <OfficerEditor 
      officers={officers} 
      members={members}
      onUpdate={onUpdate}
    />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {officers.map((officer) => (
        <div key={officer.id} className="bg-white shadow rounded-lg p-6">
          <Image
            src={officer.image}
            alt={officer.name}
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-center">{officer.name}</h3>
          <p className="text-center text-gray-600">{officer.position}</p>
          <p className="text-center text-blue-500">{officer.email}</p>
        </div>
      ))}
    </div>
  );

  if (isEditing) {
    return content;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Officers</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

