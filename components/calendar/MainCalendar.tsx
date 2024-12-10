import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CalendarEvent, CalendarView } from "@/lib/types/calendar"
import { DayView } from "./DayView"
import { WeekView } from "./WeekView"
import { MonthView } from "./MonthView"
import { CalendarHeader } from "./CalendarHeader"
import { getDateRange } from "@/lib/utils/calendar"

interface MainCalendarProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  selectedView: CalendarView
  setSelectedView: (view: CalendarView) => void
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  isDesktop: boolean
}

export function MainCalendar({
  selectedDate,
  setSelectedDate,
  selectedView,
  setSelectedView,
  events,
  onEventClick,
  isDesktop
}: MainCalendarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleViewChange = (view: CalendarView) => {
    setSelectedView(view)
  }

  return (
    <Card className="p-4 h-full flex flex-col">
      <CalendarHeader
        selectedDate={selectedDate}
        selectedView={selectedView}
        isDesktop={isDesktop}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        handleViewChange={handleViewChange}
        setSelectedDate={setSelectedDate}
      />

      <div className="overflow-auto flex-grow">
        {selectedView === 'day' && (
          <DayView
            selectedDate={selectedDate}
            events={events}
            onEventClick={onEventClick}
          />
        )}
        {selectedView === 'week' && (
          <WeekView
            selectedDate={selectedDate}
            events={events}
            onEventClick={onEventClick}
          />
        )}
        {selectedView === 'month' && (
          <MonthView
            selectedDate={selectedDate}
            events={events}
            onEventClick={onEventClick}
            days={getDateRange(selectedDate, selectedView)}
          />
        )}
      </div>
    </Card>
  )
}

