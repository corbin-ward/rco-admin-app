'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

interface Announcement {
  id: number
  image: string
  alt: string
}

interface AnnouncementsCarouselProps {
  announcements: Announcement[]
}

// Rename to AnnouncementsCarousel
export function AnnouncementsCarousel({ announcements }: AnnouncementsCarouselProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-[640px] mx-auto">
          <CarouselContent>
            {announcements.map((announcement) => (
              <CarouselItem key={announcement.id}>
                <div className="p-1">
                  <Image
                    src={announcement.image}
                    alt={announcement.alt}
                    width={640}
                    height={360}
                    className="rounded-lg w-full aspect-video object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardContent>
    </Card>
  )
}

