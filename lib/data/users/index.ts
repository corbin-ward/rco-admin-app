import { User, UserProfile } from '../../types'

const users: User[] = [
  {
    userId: 1,
    name: "Corbin Ward",
    avatar: "https://github.com/shadcn.png",
    banner: "https://placehold.co/1920x1080"
  }
]

export function getCurrentUser(): User {
  return users[0]
}

export function getUserProfile(): UserProfile {
  return {
    ...getCurrentUser(),
    organizations: 3,
    events: 16,
    likes: 84,
    attendees: 232
  }
}

