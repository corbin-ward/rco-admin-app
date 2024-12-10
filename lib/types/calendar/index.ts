export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  organizationId: number;
  organizationName: string;
  color?: string;
  isLiked?: boolean;
  width?: number;
  left?: number;
}

export interface Organization {
  id: number;
  name: string;
  color: string;
  isSelected?: boolean;
}

export type CalendarView = 'day' | 'week' | 'month';

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface DayEvents {
  date: Date;
  events: CalendarEvent[];
}

