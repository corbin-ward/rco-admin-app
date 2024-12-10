import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Organization {
  name: string
  type: string
  icon: string
  slug: string
}

interface OrganizationsCardProps {
  organizations: Organization[]
  suggestedOrganizations: Organization[]
}

export function OrganizationsCard({ organizations, suggestedOrganizations }: OrganizationsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Organizations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {organizations.map((org) => (
            <Link href={`/organizations/${org.slug}`} key={org.name} className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <Image
                src={org.icon}
                alt={org.name}
                width={40}
                height={40}
                className="rounded-lg flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold truncate">{org.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{org.type}</p>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Suggested</h3>
          <div className="space-y-4">
            {suggestedOrganizations.map((org) => (
              <Link href={`/organizations/${org.slug}`} key={org.name} className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <Image
                  src={org.icon}
                  alt={org.name}
                  width={40}
                  height={40}
                  className="rounded-lg flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{org.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{org.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

