import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table2, BarChart2, FileText } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

interface Task {
  taskId: number
  name: string
  date: string
  type: 'sheet' | 'poll' | 'form' | 'default'
  organization: {
    name: string
    icon: string
  }
}

interface TasksCardProps {
  tasks: Task[]
}

export function TasksCard({ tasks }: TasksCardProps) {
  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'sheet':
        return <Table2 className="h-4 w-4" />;
      case 'poll':
        return <BarChart2 className="h-4 w-4" />;
      case 'form':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.taskId} className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={task.organization.icon}
                  alt={task.organization.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  {getTaskIcon(task.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{task.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/tasks">View All Tasks</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

