import { OrganizationDetails } from '../../types';

// Add this array of distinct colors
const organizationColors = [
  "#4CAF50", "#2196F3", "#FFC107", "#E91E63", "#9C27B0",
  "#FF5722", "#00BCD4", "#795548", "#607D8B", "#F44336",
];

const organizationsData: OrganizationDetails[] = [
  {
    id: 1,
    slug: 'sigma-chi',
    name: 'Sigma Chi',
    type: 'Fraternity',
    code: 'SC',
    description: 'Sigma Chi is one of the largest and oldest social fraternities with strong values and a commitment to friendship, justice, and learning.',
    foundingDate: new Date('1855-06-28'),
    banner: "https://placehold.co/1000x300",
    icon: "https://placehold.co/150x150",
    memberCount: 75,
    members: [
      { id: 1, name: 'John Doe', joinDate: new Date('2022-09-01'), status: 'Active', year: 'Junior', officerPosition: 'President' },
      { id: 2, name: 'Jane Smith', joinDate: new Date('2023-01-15'), status: 'Active', year: 'Sophomore' },
      { id: 3, name: 'Bob Johnson', joinDate: new Date('2023-09-01'), status: 'Prospective', year: 'Freshman' },
    ],
    officers: [
      { id: 1, name: 'John Doe', position: 'President', email: 'john.doe@example.com', image: 'https://placehold.co/150x150' },
      { id: 2, name: 'Alice Brown', position: 'Vice President', email: 'alice.brown@example.com', image: 'https://placehold.co/150x150' },
      { id: 3, name: 'Charlie Davis', position: 'Treasurer', email: 'charlie.davis@example.com', image: 'https://placehold.co/150x150' },
    ],
    tags: ['Leadership', 'Brotherhood', 'Community Service', 'Academic Excellence'],
    shortDescription: 'Developing leaders and fostering lifelong friendships since 1855.',
    deiStatement: 'Sigma Chi is committed to creating an inclusive environment that celebrates diversity and promotes equity among all members and in our community outreach efforts.',
    contactInfo: 'Email: recruitment@sigmachi.org | Phone: (555) 123-4567',
    requirementsToJoin: 'Open to all male students with a GPA of 2.5 or higher. Must complete the recruitment process and uphold Sigma Chi values.',
    meetingInfo: JSON.stringify({
      frequency: 1,
      interval: 'Weeks',
      weekdays: ['Sunday'],
      time: '19:00',
      location: 'Student Union, Room 301'
    }),
    socialMedia: {
      website: 'https://www.sigmachi.org',
      facebook: 'https://www.facebook.com/sigmachi',
      instagram: 'https://www.instagram.com/sigmachi',
      twitter: 'https://twitter.com/sigmachi',
      linkedin: 'https://www.linkedin.com/company/sigma-chi-fraternity',
    },
    documents: [
      {
        id: 1,
        name: 'bylaws.pdf',
        title: 'Organization Bylaws',
        url: '/placeholder.pdf',
        uploadDate: new Date('2023-01-15')
      },
      {
        id: 2,
        name: 'insurance.pdf',
        title: 'Insurance Information',
        url: '/placeholder.pdf',
        uploadDate: new Date('2023-03-22')
      },
      {
        id: 3,
        name: 'event_planning.docx',
        title: 'Event Planning Guide',
        url: '/placeholder.docx',
        uploadDate: new Date('2023-05-10')
      }
    ],
  },
  {
    id: 2,
    slug: 'alpha-phi',
    name: 'Alpha Phi',
    type: 'Sorority',
    code: 'AP',
    description: 'Alpha Phi is a sisterhood of outstanding women supporting one another in lifelong achievement.',
    foundingDate: new Date('1872-10-10'),
    banner: "https://placehold.co/1000x300",
    icon: "https://placehold.co/150x150",
    memberCount: 65,
    members: [],
    officers: [],
    tags: ['Sisterhood', 'Leadership', 'Philanthropy', 'Personal Development'],
    shortDescription: 'Empowering women and cultivating leadership since 1872.',
    deiStatement: 'Alpha Phi is dedicated to fostering an inclusive environment that embraces diversity and promotes equity among all members.',
    contactInfo: 'Email: recruitment@alphaphi.org | Phone: (555) 987-6543',
    requirementsToJoin: 'Open to all female students. Must participate in formal recruitment and uphold Alpha Phi values.',
    meetingInfo: JSON.stringify({
      frequency: 1,
      interval: 'Weeks',
      weekdays: ['Monday'],
      time: '18:00',
      location: 'Student Center, Room 202'
    }),
    socialMedia: {
      website: 'https://www.alphaphi.org',
      instagram: 'https://www.instagram.com/alphaphi',
    },
    documents: [
      {
        id: 1,
        name: 'bylaws.pdf',
        title: 'Organization Bylaws',
        url: '/placeholder.pdf',
        uploadDate: new Date('2023-01-15')
      },
      {
        id: 2,
        name: 'insurance.pdf',
        title: 'Insurance Information',
        url: '/placeholder.pdf',
        uploadDate: new Date('2023-03-22')
      },
      {
        id: 3,
        name: 'event_planning.docx',
        title: 'Event Planning Guide',
        url: '/placeholder.docx',
        uploadDate: new Date('2023-05-10')
      }
    ],
  },
];

export function getOrganizationBySlug(slug: string): OrganizationDetails | undefined {
  return organizationsData.find(org => org.slug === slug);
}

export function getAllOrganizationSlugs(): string[] {
  return organizationsData.map(org => org.slug);
}

export function getAllOrganizations(): OrganizationDetails[] {
  return organizationsData.map((org, index) => ({
    ...org,
    color: organizationColors[index % organizationColors.length]
  }));
}

