import { Event } from '../../types';
import { getAllOrganizations } from '../organizations';

function generateSlug(): string {
  return Math.random().toString(36).substring(2, 12);
}

const events: Event[] = Array.from({ length: 100 }, (_, i) => {
  const org = getAllOrganizations()[Math.floor(Math.random() * getAllOrganizations().length)];
  return {
    id: `event-${i + 1}`,
    slug: generateSlug(),
    title: `${org.name} ${['Meeting', 'Workshop', 'Seminar', 'Conference', 'Social'][Math.floor(Math.random() * 5)]}`,
    description: `Join us for an exciting event hosted by ${org.name}!`,
    date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    location: "Campus Center",
    organizationId: org.id,
    organizationName: org.name,
    organizationIcon: org.icon,
    image: `https://picsum.photos/seed/${i + 1}/640/640`,
    isSaved: Math.random() > 0.7,
    tags: ['Community', 'Education', 'Networking'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
    likes: Math.floor(Math.random() * 100),
    saves: Math.floor(Math.random() * 50),
    expectedGuests: Math.floor(Math.random() * 200) + 50,
    perks: ['Networking', 'Free Swag', 'Professional Development'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
    isPublic: Math.random() > 0.3,
    foodInformation: {
      isServed: Math.random() > 0.5,
      vendors: Math.random() > 0.5 ? ['Local Catering Co.', 'Campus Dining'] : undefined,
      menu: Math.random() > 0.5 ? ['Sandwiches', 'Salads', 'Beverages'] : undefined,
    },
    guestSpeakers: Math.random() > 0.7 ? ['Dr. Jane Smith', 'Prof. John Doe'] : undefined,
    performers: Math.random() > 0.8 ? ['Campus Band', 'Local Artist'] : undefined,
    riskManagement: 'Standard event safety protocols in place. Security personnel will be present.',
    fundingInformation: `Funded by ${org.name} and campus event budget.`,
    ticketInformation: {
      price: Math.floor(Math.random() * 50) * 5,
      availableTickets: Math.floor(Math.random() * 100) + 50,
    },
    dresscode: ['Casual', 'Business Casual', 'Formal'][Math.floor(Math.random() * 3)],
    contactPerson: {
      name: `${['Alice', 'Bob', 'Charlie', 'Diana'][Math.floor(Math.random() * 4)]} ${['Smith', 'Johnson', 'Williams', 'Brown'][Math.floor(Math.random() * 4)]}`,
      email: `contact${i + 1}@${org.name.toLowerCase().replace(/\s/g, '')}.edu`,
    },
  };
});

export function getEvents(): Event[] {
  return events;
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getSavedEvents(): Event[] {
  return events.filter(event => event.isSaved);
}

export function getUpcomingEvents(): Event[] {
  return events
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 4);
}

