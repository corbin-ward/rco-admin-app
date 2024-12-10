\`\`\`typescript
interface MeetingSchedule {
  frequency: number;
  interval: string;
  weekdays: string[];
  time: string;
  location: string;
}

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


const renderMeetingScheduleEditor = (schedule: MeetingSchedule) => {
  //Implementation for editor
  return <div>Editor for {JSON.stringify(schedule)}</div>
}

const organization = {
  meetingInfo: '{"frequency": 1, "interval": "Weeks", "weekdays": ["Monday"], "time": "14:00", "location": "Conference Room"}',
  // ... other organization properties
};


const isEditing = false; //Example, replace with actual state

const App = () => {
  return (
    <div>
      {organization.meetingInfo && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-primary rounded-full p-2">
              {/*<Clock className="h-6 w-6 text-primary-foreground" />*/}
              <span>Clock Icon</span>
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
    </div>
  );
};

export default App;
\`\`\`

