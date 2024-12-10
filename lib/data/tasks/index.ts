import { Task } from '../../types'

const tasks: Task[] = [
  {
    taskId: 1,
    memberId: 1,
    name: "Sheet - Update Roster",
    type: "sheet",
    description: "Update the roster sheet with new members",
    complete: false,
    date: "August 25th at 11:59 PM",
    organization: {
      name: "Sigma Chi",
      icon: "https://placehold.co/40x40"
    }
  },
  {
    taskId: 2,
    memberId: 1,
    name: "Poll - Meeting Time",
    type: "poll",
    description: "Create a poll for the next meeting time",
    complete: false,
    date: "August 28th at 11:59 PM",
    organization: {
      name: "Alpha Phi",
      icon: "https://placehold.co/40x40"
    }
  },
  {
    taskId: 3,
    memberId: 1,
    name: "Form - FSL Annual Report",
    type: "form",
    description: "Complete the annual report for FSL",
    complete: false,
    date: "September 5th at 11:59 PM",
    organization: {
      name: "Fraternity & Sorority Life",
      icon: "https://placehold.co/40x40"
    }
  }
]

export function getTasks(): Task[] {
  return tasks
}

