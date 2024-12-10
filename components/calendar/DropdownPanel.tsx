import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { OrganizationFilter } from "@/components/calendar/organization-filter"
import { Organization } from "@/lib/types/calendar"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface DropdownPanelProps {
  isOpen: boolean
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  organizations: Organization[]
  toggleOrganization: (orgId: number) => void
  onClose: () => void
}

export function DropdownPanel({
  isOpen,
  selectedDate,
  setSelectedDate,
  organizations,
  toggleOrganization,
  onClose
}: DropdownPanelProps) {
  if (!isOpen) return null

  return (
    <div className="absolute left-0 right-0 top-[64px] bg-background z-50 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border w-full"
          />
        </Card>
        <Card className="p-4">
          <OrganizationFilter
            organizations={organizations}
            onToggle={toggleOrganization}
          />
        </Card>
      </div>
    </div>
  )
}

