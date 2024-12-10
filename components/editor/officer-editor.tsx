import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganizationMember, OrganizationOfficer } from "@/lib/types"
import { X, Plus, ChevronUp, ChevronDown } from 'lucide-react'

interface OfficerPosition {
  id: number
  title: string
  members: OrganizationOfficer[]
}

interface OfficerEditorProps {
  officers: OrganizationOfficer[]
  members: OrganizationMember[]
  onUpdate: (updatedOfficers: OrganizationOfficer[]) => void
}

export function OfficerEditor({ officers, members, onUpdate }: OfficerEditorProps) {
  const [positions, setPositions] = useState<OfficerPosition[]>([])
  const [newPosition, setNewPosition] = useState('')
  const [availableMembers, setAvailableMembers] = useState<OrganizationMember[]>([])

  useEffect(() => {
    const positionMap = new Map<string, OfficerPosition>()
    officers.forEach(officer => {
      if (!positionMap.has(officer.position)) {
        positionMap.set(officer.position, {
          id: Date.now() + Math.random(),
          title: officer.position,
          members: []
        })
      }
      positionMap.get(officer.position)!.members.push(officer)
    })
    setPositions(Array.from(positionMap.values()))
    updateAvailableMembers()
  }, [officers])

  const updateAvailableMembers = () => {
    setAvailableMembers(members);
  };

  const addPosition = () => {
    if (newPosition.trim()) {
      const updatedPositions = [...positions, { id: Date.now(), title: newPosition.trim(), members: [] }]
      setPositions(updatedPositions)
      setNewPosition('')
      updateAvailableMembers()
    }
  }

  const removePosition = (id: number) => {
    const updatedPositions = positions.filter(p => p.id !== id)
    setPositions(updatedPositions)
    onUpdate(updatedPositions.flatMap(p => p.members))
  }

  const addMemberToPosition = (positionId: number, memberId: number) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const updatedPositions = positions.map(p => {
      if (p.id === positionId) {
        const existingOfficer = p.members.find(m => m.name === member.name);
        if (!existingOfficer) {
          const newOfficer: OrganizationOfficer = {
            id: Date.now(),
            name: member.name,
            position: p.title,
            email: `${member.name.toLowerCase().replace(' ', '.')}@example.com`,
            image: 'https://placehold.co/150x150'
          };
          return { ...p, members: [...p.members, newOfficer] };
        }
      }
      return p;
    });

    setPositions(updatedPositions);
    onUpdate(updatedPositions.flatMap(p => p.members));
  };

  const removeMemberFromPosition = (positionId: number, officerId: number) => {
    const updatedPositions = positions.map(p => {
      if (p.id === positionId) {
        return { ...p, members: p.members.filter(m => m.id !== officerId) };
      }
      return p;
    });

    setPositions(updatedPositions);
    onUpdate(updatedPositions.flatMap(p => p.members));
  };

  const movePosition = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= positions.length) return

    const updatedPositions = [...positions]
    ;[updatedPositions[index], updatedPositions[newIndex]] = [updatedPositions[newIndex], updatedPositions[index]]
    setPositions(updatedPositions)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Officer Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {positions.map((position, index) => (
            <div key={position.id} className="border p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{position.title}</h3>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => movePosition(index, 'up')} disabled={index === 0}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => movePosition(index, 'down')} disabled={index === positions.length - 1}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removePosition(position.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {position.members.map(officer => (
                  <Badge key={officer.id} variant="secondary" className="flex items-center gap-2">
                    {officer.name}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={() => removeMemberFromPosition(position.id, officer.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addMemberToPosition(position.id, Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Add member" />
                </SelectTrigger>
                <SelectContent>
                  {availableMembers.map(member => (
                    <SelectItem key={member.id} value={member.id.toString()}>{member.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Input
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            placeholder="New position title"
          />
          <Button onClick={addPosition}>
            <Plus className="mr-2 h-4 w-4" /> Add Position
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

