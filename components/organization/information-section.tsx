import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Clock, Plus, X, Mail, Phone, Globe, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { OrganizationDetails } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InformationSectionProps {
  organization: OrganizationDetails
  isEditing: boolean
  onUpdate: (field: keyof OrganizationDetails, value: string) => void
  onAddTag: (tag: string) => void
  onRemoveTag: (index: number) => void
}

interface MeetingSchedule {
  frequency: number;
  interval: 'Weeks' | 'Months';
  weekdays: string[];
  time: string;
  location: string;
}

export function InformationSection({ organization, isEditing, onUpdate, onAddTag, onRemoveTag }: InformationSectionProps) {
  const parseMeetingInfo = (info: string | undefined): MeetingSchedule => {
    if (!info) return { frequency: 1, interval: 'Weeks', weekdays: [], time: '', location: '' };
    try {
      const parsed = JSON.parse(info);
      if (Object.keys(parsed).length === 0) {
        // Return default values if the parsed object is empty
        return { frequency: 1, interval: 'Weeks', weekdays: [], time: '', location: '' };
      }
      return {
        ...parsed,
        weekdays: parsed.weekdays || [],
        interval: parsed.interval === 'Days' ? 'Weeks' : parsed.interval,
      };
    } catch (error) {
      console.error('Error parsing meetingInfo:', error);
      return { frequency: 1, interval: 'Weeks', weekdays: [], time: '', location: '' };
    }
  };

  const renderEditableText = (field: keyof OrganizationDetails, multiline = false) => {
    const value = organization[field] as string
    if (field === 'meetingInfo' && isEditing) {
      return renderMeetingScheduleEditor(parseMeetingInfo(value));
    }
    return isEditing ? (
      multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onUpdate(field, e.target.value)}
          className="w-full"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onUpdate(field, e.target.value)}
          className="w-full"
        />
      )
    ) : (
      <p>{value}</p>
    )
  }

  const renderMeetingScheduleEditor = (schedule: MeetingSchedule) => {
    const updateSchedule = (key: keyof MeetingSchedule, value: any) => {
      const updatedSchedule = { ...schedule, [key]: value }
      onUpdate('meetingInfo', JSON.stringify(updatedSchedule))
    }

    const toggleWeekday = (day: string) => {
      const updatedWeekdays = schedule.weekdays.includes(day)
        ? schedule.weekdays.filter(d => d !== day)
        : [...schedule.weekdays, day];
      updateSchedule('weekdays', updatedWeekdays);
    }

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span>Every</span>
            <Input
              type="number"
              value={schedule.frequency || 1}
              onChange={(e) => updateSchedule('frequency', parseInt(e.target.value))}
              className="w-16"
              min={1}
            />
            <Select
              value={schedule.interval || 'Weeks'}
              onValueChange={(value) => updateSchedule('interval', value as 'Weeks' | 'Months')}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weeks">Week(s)</SelectItem>
                <SelectItem value="Months">Month(s)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day) => (
              <Button
                key={day}
                variant={schedule.weekdays.includes(day) ? "default" : "outline"}
                className={`rounded-full w-8 h-8 p-0 ${schedule.weekdays.includes(day) ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => toggleWeekday(day)}
              >
                {day[0]}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span>at</span>
            <Input
              type="time"
              value={schedule.time || ''}
              onChange={(e) => updateSchedule('time', e.target.value)}
              className="w-32"
            />
          </div>
          <div className="flex items-center space-x-2 flex-grow">
            <span>in</span>
            <Input
              value={schedule.location || ''}
              onChange={(e) => updateSchedule('location', e.target.value)}
              placeholder="Location"
              className="flex-grow"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderSocialMediaInput = (platform: string) => {
    const field = `socialMedia.${platform}` as keyof OrganizationDetails
    const value = organization.socialMedia?.[platform] || ''
    return isEditing ? (
      <div className="flex items-center space-x-2">
        {getSocialIcon(platform)}
        <Input
          value={value}
          onChange={(e) => onUpdate(field, e.target.value)}
          className="flex-grow"
          placeholder={`${platform} URL`}
        />
      </div>
    ) : value ? (
      <a href={value} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:underline">
        {getSocialIcon(platform)}
        <span>{platform}</span>
      </a>
    ) : null
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'website': return <Globe className="h-6 w-6" />
      case 'facebook': return <Facebook className="h-6 w-6" />
      case 'instagram': return <Instagram className="h-6 w-6" />
      case 'twitter': return <Twitter className="h-6 w-6" />
      case 'linkedin': return <Linkedin className="h-6 w-6" />
      default: return null
    }
  }

  const formatMeetingSchedule = (schedule: MeetingSchedule) => {
    if (!schedule.frequency || !schedule.interval || schedule.weekdays.length === 0 || !schedule.time || !schedule.location) {
      return 'No meeting schedule set';
    }
    const weekdaysString = schedule.weekdays.join(', ');
    let frequencyString = '';
    if (schedule.interval === 'Weeks') {
      if (schedule.frequency === 1) {
        frequencyString = 'Every week';
      } else if (schedule.frequency === 2) {
        frequencyString = 'Every other week';
      } else {
        frequencyString = `Every ${schedule.frequency} weeks`;
      }
    } else {
      frequencyString = `Every ${schedule.frequency} ${schedule.interval.toLowerCase()}`;
    }

    // Convert time to 12-hour format
    const [hours, minutes] = schedule.time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

    return `${frequencyString} on ${weekdaysString} at ${formattedTime} in ${schedule.location}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{organization.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {organization.meetingInfo && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary rounded-full p-2">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Meeting Schedule</h3>
              </div>
              <div className="ml-12">
                {isEditing ? (
                  renderMeetingScheduleEditor(parseMeetingInfo(organization.meetingInfo))
                ) : (
                  <p>{formatMeetingSchedule(parseMeetingInfo(organization.meetingInfo))}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">About Us</h3>
            {renderEditableText('shortDescription')}
          </div>

          <div>
            <h4 className="font-semibold mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {organization.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2">
                  {tag}
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => onRemoveTag(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  placeholder="New tag"
                  className="w-full sm:w-auto"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onAddTag((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
                <Button variant="outline" size="sm" onClick={() => {
                  const input = document.querySelector('input[placeholder="New tag"]') as HTMLInputElement
                  if (input.value) {
                    onAddTag(input.value)
                    input.value = ''
                  }
                }}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Detailed Description</h3>
            {renderEditableText('description', true)}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Diversity, Equity, and Inclusion Statement</h3>
            {renderEditableText('deiStatement', true)}
          </div>

          <Separator />

          {organization.requirementsToJoin && (
            <div>
              <h3 className="font-semibold mb-2">Requirements to Join</h3>
              {renderEditableText('requirementsToJoin', true)}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Get in Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={organization.contactInfo.split('|')[0].trim()}
                    onChange={(e) => {
                      const phone = organization.contactInfo.split('|')[1] || ''
                      onUpdate('contactInfo', `${e.target.value} | ${phone}`)
                    }}
                    placeholder="Email"
                    className="w-full sm:w-auto flex-grow"
                  />
                ) : (
                  <p>{organization.contactInfo.split('|')[0].trim()}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={organization.contactInfo.split('|')[1]?.trim() || ''}
                    onChange={(e) => {
                      const email = organization.contactInfo.split('|')[0] || ''
                      onUpdate('contactInfo', `${email} | ${e.target.value}`)
                    }}
                    placeholder="Phone"
                    className="w-full sm:w-auto flex-grow"
                  />
                ) : (
                  <p>{organization.contactInfo.split('|')[1]?.trim()}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media and Websites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(organization.socialMedia || {}).map(([platform, url]) => (
                url && (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    {getSocialIcon(platform)}
                  </a>
                )
              ))}
            </div>
            {isEditing && (
              <div className="space-y-4 mt-4">
                {Object.entries(organization.socialMedia || {}).map(([platform, url]) => (
                  <div key={platform} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    {getSocialIcon(platform)}
                    <Input
                      value={url || ''}
                      onChange={(e) => onUpdate(`socialMedia.${platform}` as keyof OrganizationDetails, e.target.value)}
                      placeholder={`${platform} URL`}
                      className="w-full sm:w-auto flex-grow"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

