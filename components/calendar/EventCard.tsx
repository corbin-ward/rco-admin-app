import { CalendarEvent } from "@/lib/types/calendar"
import { formatTime } from "@/lib/utils/calendar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MapPin, Clock, ArrowRight } from 'lucide-react'

interface EventCardProps {
  event: CalendarEvent
  onClick: (event: CalendarEvent) => void
  view: 'day' | 'week' | 'month'
  dayStart?: Date
  timeSlotHeight: number
}

export function EventCard({ event, onClick, view, dayStart, timeSlotHeight }: EventCardProps) {
  const isMultiDay = event.isMultiDay;

  const cardContent = (
    <div 
      className="px-2 py-1 rounded overflow-hidden text-white h-full"
      style={{ 
        backgroundColor: event.color || 'hsl(var(--primary))',
      }}
    >
      <div className="text-xs font-medium truncate">
        {event.title}
      </div>
      {view !== 'month' && (
        <div className="text-xs truncate">
          {isMultiDay ? (
            <span>
              {formatTime(event.displayStartTime)} <ArrowRight className="inline h-3 w-3" />
            </span>
          ) : (
            <span>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if ((view === 'day' || view === 'week') && dayStart) {
    const startMinutes = (event.displayStartTime.getHours() * 60 + event.displayStartTime.getMinutes()) - (dayStart.getHours() * 60 + dayStart.getMinutes());
    const endMinutes = (event.displayEndTime.getHours() * 60 + event.displayEndTime.getMinutes()) - (dayStart.getHours() * 60 + dayStart.getMinutes());
    const durationMinutes = endMinutes - startMinutes;
    
    return (
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${(startMinutes / 60) * timeSlotHeight}px`,
          height: `${(durationMinutes / 60) * timeSlotHeight}px`,
          width: `${100 * (event.width || 1)}%`,
          left: `${100 * (event.left || 0)}%`,
        }}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <button
              onClick={() => onClick(event)}
              className="w-full h-full text-left"
            >
              {cardContent}
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{event.title}</h4>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                {isMultiDay && <span className="ml-1 text-xs">(Multi-day event)</span>}
              </div>
              {event.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {event.location}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {event.organizationName}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  }

  if (view === 'month') {
    return (
      <button
        onClick={() => onClick(event)}
        className="w-full text-left text-xs truncate px-1 py-0.5 rounded text-white"
        style={{ backgroundColor: event.color || 'hsl(var(--primary))' }}
      >
        {isMultiDay ? (
          <span>
            {formatTime(event.displayStartTime)} <ArrowRight className="inline h-3 w-3" /> {event.title}
          </span>
        ) : (
          <span>
            {formatTime(event.startTime)} {event.title}
          </span>
        )}
      </button>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          onClick={() => onClick(event)}
          className="w-full text-left"
        >
          {cardContent}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{event.title}</h4>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
            {isMultiDay && <span className="ml-1 text-xs">(Multi-day event)</span>}
          </div>
          {event.location && (
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              {event.location}
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {event.organizationName}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

