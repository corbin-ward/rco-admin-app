import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Event } from "@/lib/types"
import { Heart, Bookmark, Share2, CalendarIcon, Clock, MapPin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface EventDialogProps {
  event: Event
  onLike: () => void
  onSave: () => void
  onShare: () => void
  isLiked: boolean
  isSaved: boolean
}

export function EventDialog({ event, onLike, onSave, onShare, isLiked, isSaved }: EventDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full p-0 h-auto hover:opacity-95 transition-opacity"
        >
          <div className="w-full aspect-square">
            <Image
              src={event.image}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src={event.organizationIcon}
              alt={event.organizationName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold">{event.organizationName}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{event.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-2 h-4 w-4" />
              <span>{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.tags && event.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant={isLiked ? "default" : "outline"} size="sm" onClick={onLike}>
              <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              Like ({event.likes})
            </Button>
            <Button variant={isSaved ? "default" : "outline"} size="sm" onClick={onSave}>
              <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              Save ({event.saves})
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Button asChild>
            <Link href={`/events/${event.slug}`}>
              View Full Event Details
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

