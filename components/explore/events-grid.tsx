'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Event } from "@/lib/types"
import { EventDialog } from "@/components/events/EventDialog"

interface EventsGridProps {
  events: Event[]
  onSaveEvent: (eventId: string) => void
}

export function EventsGrid({ events, onSaveEvent }: EventsGridProps) {
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([])
  const [page, setPage] = useState(1)
  const eventsPerPage = 9

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    const endIndex = page * eventsPerPage
    setVisibleEvents(events.slice(0, endIndex))
  }, [page, events])

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView])

  const handleLike = (eventId: string) => {
    // Implement like functionality
    console.log(`Liked event: ${eventId}`)
  }

  const handleShare = (eventId: string) => {
    // Implement share functionality
    console.log(`Shared event: ${eventId}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {visibleEvents.map((event, index) => (
  <div 
    key={event.id} 
    className={`${index % 12 === 0 || index % 12 === 7 ? "md:col-span-2 md:row-span-2" : ""} relative`}
  >
    <EventDialog
      event={event}
      onLike={() => handleLike(event.id)}
      onSave={() => onSaveEvent(event.id)}
      onShare={() => handleShare(event.id)}
      isLiked={false}
      isSaved={event.isSaved || false}
    />
  </div>
))}
      {visibleEvents.length < events.length && (
        <div ref={ref} className="col-span-full flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}

