import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface UserProfileCardProps {
  name: string
  avatar: string
  organizations: number
  events: number
  likes: number
  attendees: number
}

export function UserProfileCard({ name, avatar, organizations, events, likes, attendees }: UserProfileCardProps) {
  return (
    <Card className="mb-4">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
        <Avatar className="absolute -bottom-6 left-4 h-20 w-20 border-4 border-white">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="pt-8">
        <h2 className="text-xl font-bold truncate">{name}</h2>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <p className="text-sm text-muted-foreground">Organizations</p>
            <p className="font-semibold">{organizations}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Events</p>
            <p className="font-semibold">{events}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Likes</p>
            <p className="font-semibold">{likes}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Attendees</p>
            <p className="font-semibold">{attendees}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full">Create a New Event</Button>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/organizations/register">Create a New Organization</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

