import { MeetingState } from './../model/state.enum';
import { Converter } from '../../common/converter';
import { Meeting } from './../meeting.entity';
import { CreateMeetingDto } from './../model/createMeeting.dto';

export class CreateMeetingDtoConverter implements Converter<CreateMeetingDto, Partial<Meeting>> {

    constructor() {}

    convertInbound(meeting: CreateMeetingDto): Partial<Meeting> {
        return {
            attendee: meeting.attendee,
            organizer: meeting.organizer,
            date: meeting.date.toString(),
            state: MeetingState.Pending,
        };
    }
}
