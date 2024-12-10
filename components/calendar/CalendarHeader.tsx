import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CalendarView } from "@/lib/types/calendar"

interface CalendarHeaderProps {
  selectedDate: Date
  selectedView: CalendarView
  isDesktop: boolean
  isCalendarOpen: boolean
  setIsCalendarOpen: (isOpen: boolean) => void
  handleViewChange: (view: CalendarView) => void
  setSelectedDate: (date: Date) => void
}

export function CalendarHeader({
  selectedDate,
  selectedView,
  isDesktop,
  isCalendarOpen,
  setIsCalendarOpen,
  handleViewChange,
  setSelectedDate
}: CalendarHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <ToggleGroup type="single" value={selectedView} onValueChange={(value) => handleViewChange(value as CalendarView)}>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
        <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
          Today
        </Button>
      </div>

      <div className="flex justify-center items-center mb-4">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="text-2xl font-bold">
              {format(selectedDate, 'MMMM yyyy')}
              {!isDesktop && (
                isCalendarOpen ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                date && setSelectedDate(date)
                setIsCalendarOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

