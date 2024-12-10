export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizationId: number;
  organizationName: string;
  organizationIcon: string;
  image: string;
  isSaved?: boolean;
  tags?: string[];
  likes?: number;
  saves?: number;
  expectedGuests?: number;
  perks?: string[];
  isPublic?: boolean;
  foodInformation?: {
    isServed: boolean;
    vendors?: string[];
    menu?: string[];
  };
  guestSpeakers?: string[];
  performers?: string[];
  riskManagement?: string;
  fundingInformation?: string;
  ticketInformation?: {
    price: number;
    availableTickets: number;
  };
  dresscode?: string;
  contactPerson?: {
    name: string;
    email: string;
  };
}

