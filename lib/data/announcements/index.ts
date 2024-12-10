import { Announcement } from '../../types'

const announcements: Announcement[] = [
  { id: 1, image: "https://placehold.co/640x360", alt: "Announcement 1" },
  { id: 2, image: "https://placehold.co/640x360", alt: "Announcement 2" },
  { id: 3, image: "https://placehold.co/640x360", alt: "Announcement 3" },
]

export function getAnnouncements(): Announcement[] {
  return announcements
}

