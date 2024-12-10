'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserProfileCard } from "@/components/explore/user-profile-card"
import { OrganizationsCard } from "@/components/explore/organizations-card"
import { AnnouncementsCarousel } from "@/components/explore/announcements-carousel"
import { EventsGrid } from "@/components/explore/events-grid"
import { UpcomingEventsCard } from "@/components/explore/upcoming-events-card"
import { TasksCard } from "@/components/explore/tasks-card"
import { StickySearchBar } from "@/components/explore/sticky-search-bar"

import { getUserProfile } from "@/lib/data/users"
import { getAnnouncements } from "@/lib/data/announcements"
import { getEvents, getUpcomingEvents } from "@/lib/data/events"
import { getTasks } from "@/lib/data/tasks"
import { getAllOrganizations } from "@/lib/data/organizations"
import { Event } from "@/lib/types"

export default function ExplorePage() {
  const userData = getUserProfile()
  const announcements = getAnnouncements()
  const [events, setEvents] = useState<Event[]>(getEvents())
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(getUpcomingEvents())
  const tasks = getTasks()
  const allOrganizations = getAllOrganizations()

  const organizations = allOrganizations.slice(0, 3)
  const suggestedOrganizations = allOrganizations.slice(3, 5)

  const handleSaveEvent = (eventId: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId ? { ...event, isSaved: !event.isSaved } : event
      )
    )
    setUpcomingEvents(getUpcomingEvents().filter(event => event.isSaved).slice(0, 4))
  }

  return (
    <>
      <div className="hidden xl:block p-3 overflow-auto">
        <UserProfileCard {...userData} />
        <OrganizationsCard 
          organizations={organizations} 
          suggestedOrganizations={suggestedOrganizations} 
        />
      </div>

      <ScrollArea className="p-4">
        <AnnouncementsCarousel announcements={announcements} />
        <StickySearchBar />
        <div className="mt-4">
          <EventsGrid events={events} onSaveEvent={handleSaveEvent} />
        </div>
      </ScrollArea>

      <div className="hidden xl:block p-3 overflow-auto">
        <UpcomingEventsCard events={upcomingEvents} />
        <TasksCard tasks={tasks} />
      </div>
    </>
  )
}

