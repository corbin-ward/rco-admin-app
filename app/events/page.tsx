"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { OrganizationFilter } from "@/components/calendar/OrganizationFilter"
import { EventDialog } from "@/components/calendar/EventDialog"
import { CalendarEvent, Organization, CalendarView } from "@/lib/types/calendar"
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { MainCalendar } from "@/components/calendar/MainCalendar"
import { getEvents } from "@/lib/data/events"
import { getAllOrganizations } from "@/lib/data/organizations"

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [selectedView, setSelectedView] = useState<CalendarView>(isDesktop ? 'week' : 'day')
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const allOrgs = getAllOrganizations()
    const fetchedEvents = getEvents().map(event => {
      const org = allOrgs.find(org => org.id === event.organizationId)
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        startTime: event.date,
        endTime: new Date(event.date.getTime() + 2 * 60 * 60 * 1000), // Assume 2 hours duration
        organizationId: event.organizationId,
        organizationName: event.organizationName,
        color: org?.color || "#000000"
      }
    })

    setEvents(fetchedEvents)

    // Enable calendars by default for organizations that have events
    const orgsWithEvents = new Set(fetchedEvents.map(event => event.organizationId))
    const updatedOrgs = allOrgs.map(org => ({
      ...org,
      isSelected: orgsWithEvents.has(org.id)
    }))

    setOrganizations(updatedOrgs)
  }, [])

  useEffect(() => {
    setSelectedView(isDesktop ? 'week' : 'day')
  }, [isDesktop])

  const toggleOrganization = (orgId: number) => {
    setOrganizations(orgs =>
      orgs.map(org =>
        org.id === orgId ? { ...org, isSelected: !org.isSelected } : org
      )
    )
  }

  const filteredEvents = events.filter(event =>
    organizations.find(org => org.id === event.organizationId)?.isSelected
  )

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col lg:flex-row h-full">
        {isDesktop && (
          <div className="w-[340px] space-y-4 mr-4">
            <Card className="p-4 min-w-[300px]">
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
        )}

        <div className="flex-1 overflow-hidden">
          <MainCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            events={filteredEvents}
            onEventClick={handleEventClick}
            isDesktop={isDesktop}
          />
        </div>

        {!isDesktop && (
          <div className="w-full mt-4">
            <Card className="p-4">
              <OrganizationFilter
                organizations={organizations}
                onToggle={toggleOrganization}
              />
            </Card>
          </div>
        )}
      </div>

      <EventDialog
        event={selectedEvent}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}

