import { format, isSameMonth, startOfDay, isToday } from "date-fns"
import { CalendarEvent } from "@/lib/types/calendar"
import { EventCard } from "@/components/calendar/EventCard"

interface MonthViewProps {
  selectedDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  days: Date[]
}

export function MonthView({ selectedDate, events, onEventClick, days }: MonthViewProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-bold p-2">
          {day}
        </div>
      ))}
      {days.map((day, index) => (
        <div
          key={index}
          className={`border p-1 min-h-[100px] ${
            isSameMonth(day, selectedDate) ? '' : 'bg-gray-100'
          }`}
        >
          <div className={`text-sm font-semibold ${isToday(day) ? 'text-primary' : ''}`}>
            {format(day, 'd')}
            {isToday(day) && (
              <div className="w-1.5 h-1.5 bg-primary rounded-full mx-auto mt-0.5" />
            )}
          </div>
          <div className="space-y-1">
            {events
              .filter(event => {
                const eventStart = startOfDay(event.startTime);
                const eventEnd = startOfDay(event.endTime);
                return eventStart <= day && eventEnd >= day;
              })
              .map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={onEventClick}
                  view="month"
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

