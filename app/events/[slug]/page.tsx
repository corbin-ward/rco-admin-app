'use client'

import { useState } from 'react'
import { getEventBySlug } from "@/lib/data/events"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InfoCard } from "@/components/events/InfoCard"
import { Clock, MapPin, CalendarIcon, Heart, Bookmark, Share2, Users, Ticket, DollarSign, AlertTriangle, Utensils, Mic, Music, Shirt, Mail } from 'lucide-react'

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  const [likes, setLikes] = useState(event.likes || 0)
  const [saves, setSaves] = useState(event.saves || 0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    if (isSaved) {
      setSaves(saves - 1)
    } else {
      setSaves(saves + 1)
    }
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    alert('Share functionality to be implemented')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <Image
                src={event.image}
                alt={event.title}
                width={800}
                height={600}
                className="rounded-lg w-full object-cover"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags && event.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="mt-4 flex space-x-4">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  onClick={handleLike}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  Like ({likes})
                </Button>
                <Button 
                  variant={isSaved ? "default" : "outline"} 
                  onClick={handleSave}
                >
                  <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  Save ({saves})
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-3xl font-bold">{event.title}</h1>
              
              <div className="flex items-center space-x-4">
                <Image
                  src={event.organizationIcon}
                  alt={event.organizationName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-lg font-semibold">{event.organizationName}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  <span>{event.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard title="Event Details">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Expected Guests: {event.expectedGuests}</span>
                </div>
                <div className="flex items-center">
                  <Ticket className="mr-2 h-4 w-4" />
                  <span>{event.isPublic ? 'Open to Public' : 'Private Event'}</span>
                </div>
                {event.ticketInformation && (
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>Ticket Price: ${event.ticketInformation.price} ({event.ticketInformation.availableTickets} available)</span>
                  </div>
                )}
                {event.dresscode && (
                  <div className="flex items-center">
                    <Shirt className="mr-2 h-4 w-4" />
                    <span>Dress Code: {event.dresscode}</span>
                  </div>
                )}
              </div>
            </InfoCard>

            <InfoCard title="Perks & Food">
              <div className="space-y-2">
                {event.perks && event.perks.length > 0 && (
                  <div>
                    <strong>Perks:</strong> {event.perks.join(', ')}
                  </div>
                )}
                {event.foodInformation && (
                  <div>
                    <div className="flex items-center">
                      <Utensils className="mr-2 h-4 w-4" />
                      <span>{event.foodInformation.isServed ? 'Food will be served' : 'No food provided'}</span>
                    </div>
                    {event.foodInformation.vendors && (
                      <div><strong>Vendors:</strong> {event.foodInformation.vendors.join(', ')}</div>
                    )}
                    {event.foodInformation.menu && (
                      <div><strong>Menu:</strong> {event.foodInformation.menu.join(', ')}</div>
                    )}
                  </div>
                )}
              </div>
            </InfoCard>

            <InfoCard title="Speakers & Performers">
              <div className="space-y-2">
                {event.guestSpeakers && (
                  <div className="flex items-center">
                    <Mic className="mr-2 h-4 w-4" />
                    <span><strong>Guest Speakers:</strong> {event.guestSpeakers.join(', ')}</span>
                  </div>
                )}
                {event.performers && (
                  <div className="flex items-center">
                    <Music className="mr-2 h-4 w-4" />
                    <span><strong>Performers:</strong> {event.performers.join(', ')}</span>
                  </div>
                )}
              </div>
            </InfoCard>

            <InfoCard title="Risk Management">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>{event.riskManagement}</span>
              </div>
            </InfoCard>

            <InfoCard title="Funding Information">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>{event.fundingInformation}</span>
              </div>
            </InfoCard>

            <InfoCard title="Contact Information">
              {event.contactPerson && (
                <div className="space-y-2">
                  <div><strong>Contact:</strong> {event.contactPerson.name}</div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <a href={`mailto:${event.contactPerson.email}`} className="text-blue-500 hover:underline">
                      {event.contactPerson.email}
                    </a>
                  </div>
                </div>
              )}
            </InfoCard>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

