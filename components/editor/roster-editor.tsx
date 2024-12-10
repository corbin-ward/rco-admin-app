import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganizationMember } from "@/lib/types"
import { Trash } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface RosterEditorProps {
  members: OrganizationMember[]
  onUpdate: (updatedMembers: OrganizationMember[]) => void
}

export function RosterEditor({ members, onUpdate }: RosterEditorProps) {
  const [newMember, setNewMember] = useState<Partial<OrganizationMember>>({})

  const handleMemberChange = (index: number, field: keyof OrganizationMember, value: string) => {
    const updatedMembers = [...members]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    onUpdate(updatedMembers)
  }

  const addMember = () => {
    if (newMember.name && newMember.status && newMember.year) {
      onUpdate([...members, { 
        id: Date.now(), 
        joinDate: new Date(), 
        ...newMember as Omit<OrganizationMember, 'id' | 'joinDate'> 
      }])
      setNewMember({})
    }
  }

  const removeMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index)
    onUpdate(updatedMembers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roster</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Input
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>{member.joinDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Select
                    value={member.status}
                    onValueChange={(value) => handleMemberChange(index, 'status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prospective">Prospective</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Advisor">Advisor</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={member.year}
                    onValueChange={(value) => handleMemberChange(index, 'year', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freshman">Freshman</SelectItem>
                      <SelectItem value="Sophomore">Sophomore</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => removeMember(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center space-x-2 mt-4">
          <Input
            value={newMember.name || ''}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            placeholder="Name"
          />
          <Select
            value={newMember.status}
            onValueChange={(value) => setNewMember({ ...newMember, status: value as OrganizationMember['status'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prospective">Prospective</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Advisor">Advisor</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newMember.year}
            onValueChange={(value) => setNewMember({ ...newMember, year: value as OrganizationMember['year'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Freshman">Freshman</SelectItem>
              <SelectItem value="Sophomore">Sophomore</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
              <SelectItem value="Alumni">Alumni</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addMember}>Add Member</Button>
        </div>
      </CardContent>
    </Card>
  )
}

