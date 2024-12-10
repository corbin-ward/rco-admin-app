import { CalendarEvent, Organization } from "@/lib/types/calendar"

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

export const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync",
    location: "Room 101",
    startTime: new Date(currentYear, currentMonth, 5, 9, 0),
    endTime: new Date(currentYear, currentMonth, 5, 10, 0), // Updated endTime
    organizationId: 1,
    organizationName: "Sigma Chi",
    color: "#4CAF50"
  },
  {
    id: "2",
    title: "IT Shift",
    description: "Regular IT support shift",
    location: "IT Lab",
    startTime: new Date(currentYear, currentMonth, 5, 9, 30),
    endTime: new Date(currentYear, currentMonth, 5, 11, 0),
    organizationId: 2,
    organizationName: "IT Department",
    color: "#2196F3"
  },
  {
    id: "3",
    title: "Study Group",
    description: "Physics study group",
    location: "Library",
    startTime: new Date(currentYear, currentMonth, 5, 10, 30), // Updated startTime
    endTime: new Date(currentYear, currentMonth, 5, 12, 0),
    organizationId: 3,
    organizationName: "Student Council",
    color: "#FFC107"
  },
  {
    id: "4",
    title: "Lunch Break",
    description: "Lunch with colleagues",
    location: "Cafeteria",
    startTime: new Date(currentYear, currentMonth, 5, 12, 0),
    endTime: new Date(currentYear, currentMonth, 5, 13, 0),
    organizationId: 1,
    organizationName: "Sigma Chi",
    color: "#FF5722"
  },
  {
    id: "5",
    title: "Hackathon",
    description: "24-hour coding challenge",
    location: "Computer Science Building",
    startTime: new Date(currentYear, currentMonth, 15, 9, 0),
    endTime: new Date(currentYear, currentMonth, 16, 9, 0),
    organizationId: 2,
    organizationName: "IT Department",
    color: "#2196F3"
  },
  {
    id: "6",
    title: "Career Fair",
    description: "Annual university career fair",
    location: "Student Union",
    startTime: new Date(currentYear, currentMonth, 20, 10, 0),
    endTime: new Date(currentYear, currentMonth, 20, 16, 0),
    organizationId: 3,
    organizationName: "Student Council",
    color: "#FFC107"
  },
  {
    id: "7",
    title: "Workshop: Resume Writing",
    description: "Learn how to write an effective resume",
    location: "Room 202",
    startTime: new Date(currentYear, currentMonth, 20, 14, 0),
    endTime: new Date(currentYear, currentMonth, 20, 16, 0),
    organizationId: 3,
    organizationName: "Student Council",
    color: "#FFC107"
  },
  {
    id: "8",
    title: "Charity Run",
    description: "Annual charity marathon",
    location: "Campus Track",
    startTime: new Date(currentYear, currentMonth, 25, 7, 0),
    endTime: new Date(currentYear, currentMonth, 25, 12, 0),
    organizationId: 1,
    organizationName: "Sigma Chi",
    color: "#4CAF50"
  },
  {
    id: "9",
    title: "Tech Talk",
    description: "Guest speaker from a major tech company",
    location: "Auditorium",
    startTime: new Date(currentYear, currentMonth, 28, 18, 0),
    endTime: new Date(currentYear, currentMonth, 28, 20, 0),
    organizationId: 2,
    organizationName: "IT Department",
    color: "#2196F3"
  },
  {
    id: "10",
    title: "Board Game Night",
    description: "Fun night of board games",
    location: "Student Lounge",
    startTime: new Date(currentYear, currentMonth, 28, 19, 0),
    endTime: new Date(currentYear, currentMonth, 28, 23, 0),
    organizationId: 3,
    organizationName: "Student Council",
    color: "#FFC107"
  }
];

export const sampleOrganizations: Organization[] = [
  { id: 1, name: "Sigma Chi", color: "#4CAF50", isSelected: true },
  { id: 2, name: "IT Department", color: "#2196F3", isSelected: true },
  { id: 3, name: "Student Council", color: "#FFC107", isSelected: true }
];

