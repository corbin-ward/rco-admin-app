import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrganizationMember } from "@/lib/types"
import { RosterEditor } from '../editor/roster-editor'

interface RosterSectionProps {
  members: OrganizationMember[]
  isEditing: boolean
  onUpdate: (updatedMembers: OrganizationMember[]) => void
}

export function RosterSection({ members, isEditing, onUpdate }: RosterSectionProps) {
  const content = isEditing ? (
    <RosterEditor 
      members={members}
      onUpdate={onUpdate}
    />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Officer Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.joinDate.toLocaleDateString()}</TableCell>
            <TableCell>{member.status}</TableCell>
            <TableCell>{member.year}</TableCell>
            <TableCell>{member.officerPosition || 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (isEditing) {
    return content;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roster</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

