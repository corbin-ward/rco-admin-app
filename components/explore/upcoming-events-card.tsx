import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, CalendarIcon } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Event } from "@/lib/types"

interface UpcomingEventsCardProps {
  events: Event[]
}

export function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`}>
              <div className="flex items-start space-x-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <Image
                  src={event.organizationIcon}
                  alt={event.organizationName}
                  width={40}
                  height={40}
                  className="rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{event.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{event.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/events">View All Events</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

