import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TasksPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Tasks Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the content for the Tasks page. You can list your tasks or add a task management component here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

