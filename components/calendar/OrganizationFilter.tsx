import { Organization } from "@/lib/types/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface OrganizationFilterProps {
  organizations: Organization[]
  onToggle: (orgId: number) => void
}

export function OrganizationFilter({ organizations, onToggle }: OrganizationFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">My Calendars</h3>
      <div className="space-y-2">
        {organizations.map((org) => (
          <div key={org.id} className="flex items-center space-x-2">
            <Checkbox
              id={`org-${org.id}`}
              checked={org.isSelected}
              onCheckedChange={() => onToggle(org.id)}
              style={{ 
                borderColor: org.color,
                backgroundColor: org.isSelected ? org.color : undefined 
              }}
            />
            <Label
              htmlFor={`org-${org.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {org.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

