import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isWithinInterval } from 'date-fns';
import { CalendarEvent, TimeSlot, DayEvents, CalendarView } from '@/lib/types/calendar';

export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const end = endOfWeek(date, { weekStartsOn: 0 });

  return eachDayOfInterval({ start, end });
}

export function getTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);

  for (let hour = 0; hour < 24; hour++) {
    slots.push({
      start: new Date(baseDate),
      end: new Date(baseDate.setHours(hour + 1, 0, 0, 0))
    });
  }

  return slots;
}

export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  return events.filter(event => 
    isWithinInterval(dayStart, { start: event.startTime, end: event.endTime }) ||
    isWithinInterval(dayEnd, { start: event.startTime, end: event.endTime }) ||
    (event.startTime <= dayStart && event.endTime >= dayEnd)
  );
}

export function groupEventsByDay(events: CalendarEvent[], startDate: Date, days: number): DayEvents[] {
  const daysArray: DayEvents[] = [];

  for (let i = 0; i < days; i++) {
    const currentDate = addDays(startDate, i);
    daysArray.push({
      date: currentDate,
      events: getEventsForDay(events, currentDate)
    });
  }

  return daysArray;
}

export function getDateRange(date: Date, view: CalendarView): Date[] {
  switch (view) {
    case 'day':
      return [date];
    case 'week':
      return getWeekDays(date);
    case 'month':
      const start = startOfWeek(startOfMonth(date));
      const end = endOfWeek(endOfMonth(date));
      return eachDayOfInterval({ start, end });
  }
}

export function calculateEventPositions(events: CalendarEvent[], currentDate: Date): CalendarEvent[] {
  const dayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const dayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  const sortedEvents = [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  const columns: CalendarEvent[][] = [];

  for (const event of sortedEvents) {
    let placed = false;
    for (const column of columns) {
      if (!column.some(existingEvent => eventsOverlap(existingEvent, event, dayStart, dayEnd))) {
        column.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      columns.push([event]);
    }
  }

  return sortedEvents.map(event => {
    const columnIndex = columns.findIndex(column => column.includes(event));
    const column = columns[columnIndex];
    const width = 1 / columns.length;
    const left = columnIndex * width;

    return { 
      ...event, 
      width, 
      left,
      isMultiDay: event.startTime < dayStart || event.endTime > dayEnd,
      displayStartTime: event.startTime < dayStart ? dayStart : event.startTime,
      displayEndTime: event.endTime > dayEnd ? dayEnd : event.endTime
    };
  });
}

function eventsOverlap(a: CalendarEvent, b: CalendarEvent, dayStart: Date, dayEnd: Date): boolean {
  const aStart = a.startTime < dayStart ? dayStart : a.startTime;
  const aEnd = a.endTime > dayEnd ? dayEnd : a.endTime;
  const bStart = b.startTime < dayStart ? dayStart : b.startTime;
  const bEnd = b.endTime > dayEnd ? dayEnd : b.endTime;

  return aStart < bEnd && bStart < aEnd;
}

