import { format, isToday } from "date-fns"
import { CalendarEvent } from "@/lib/types/calendar"
import { EventCard } from "@/components/calendar/EventCard"
import { getTimeSlots, formatTime, calculateEventPositions } from "@/lib/utils/calendar"

interface DayViewProps {
  selectedDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return events.filter(
    event => event.startTime < dayEnd && event.endTime > dayStart
  );
}

export function DayView({ selectedDate, events, onEventClick }: DayViewProps) {
  const timeSlots = getTimeSlots();
  const dayStart = new Date(selectedDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(selectedDate);
  dayEnd.setHours(23, 59, 59, 999);

  const eventsForDay = getEventsForDay(events, selectedDate);
  const positionedEvents = calculateEventPositions(eventsForDay, selectedDate);

  return (
    <div className="relative">
      <div className="grid grid-cols-[60px_1fr]">
        <div className="sticky left-0 bg-background z-10">
          <div className="h-10"></div>
          <div className="relative h-[1200px]">
            {timeSlots.map((slot, index) => (
              <div 
                key={index} 
                className="text-xs text-gray-500 absolute w-full text-right pr-2"
                style={{ top: `${index * 50}px`, transform: 'translateY(-50%)' }}
              >
                {format(slot.start, 'h a')}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={`text-center font-bold h-10 flex items-center justify-center ${isToday(selectedDate) ? 'text-primary' : ''}`}>
            {format(selectedDate, 'EEEE, MMMM d')}
            {isToday(selectedDate) && (
              <div className="w-1.5 h-1.5 bg-primary rounded-full ml-2" />
            )}
          </div>
          <div className="relative h-[1200px]">
            {timeSlots.map((slot, index) => (
              <div 
                key={index} 
                className="absolute w-full border-t border-gray-200" 
                style={{ top: `${index * 50}px` }} 
              />
            ))}
            {calculateEventPositions(eventsForDay, selectedDate).map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={onEventClick}
                view="day"
                dayStart={dayStart}
                timeSlotHeight={50}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

