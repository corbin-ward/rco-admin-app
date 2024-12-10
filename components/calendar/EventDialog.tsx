import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarEvent } from "@/lib/types/calendar"
import { formatTime, formatDate } from "@/lib/utils/calendar"
import { MapPin, Clock } from 'lucide-react'

interface EventDialogProps {
  event: CalendarEvent | null
  isOpen: boolean
  onClose: () => void
}

export function EventDialog({ event, isOpen, onClose }: EventDialogProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{formatDate(event.startTime)}</p>
              <p className="text-sm text-muted-foreground">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <p>{event.location}</p>
            </div>
          )}

          {event.description && (
            <div className="pt-2">
              <p className="text-sm">{event.description}</p>
            </div>
          )}

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              Organized by {event.organizationName}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

