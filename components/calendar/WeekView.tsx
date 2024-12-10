import { format, startOfDay, isToday } from "date-fns"
import { CalendarEvent } from "@/lib/types/calendar"
import { EventCard } from "@/components/calendar/EventCard"
import { getTimeSlots, getWeekDays, calculateEventPositions } from "@/lib/utils/calendar"

interface WeekViewProps {
  selectedDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export function WeekView({ selectedDate, events, onEventClick }: WeekViewProps) {
  const timeSlots = getTimeSlots();
  const weekDays = getWeekDays(selectedDate);

  return (
    <div className="relative overflow-auto h-full">
      <div className="grid grid-cols-[60px_repeat(7,1fr)] min-w-[800px]">
        <div className="sticky left-0 z-20 bg-background">
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
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="min-w-[120px]">
            <div className={`sticky top-0 z-10 bg-background h-10 flex items-center justify-center font-bold ${isToday(day) ? 'text-primary' : ''}`}>
              {format(day, 'EEE, MMM d')}
              {isToday(day) && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
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
              {calculateEventPositions(events
                .filter(event => {
                  const eventStart = startOfDay(event.startTime);
                  const eventEnd = startOfDay(event.endTime);
                  return eventStart <= day && eventEnd >= day;
                }), day)
                .map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={onEventClick}
                    view="week"
                    dayStart={startOfDay(day)}
                    timeSlotHeight={50}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

