import { UserDto } from 'src/users/model/user.dto';
import { Converter } from '../../common/converter';
import { Meeting } from './../meeting.entity';
import { MeetingDto } from './../model/meeting.dto';
import { MeetingState } from './../model/state.enum';

export class MeetingDtoConverter implements Converter<MeetingDto, Meeting> {

    constructor() {}

    convertInbound(meeting: MeetingDto): Meeting {
        return {
            id: meeting.id,
            attendee: meeting.attendee.id,
            organizer: meeting.organizer.id,
            state: MeetingState[meeting.state],
            date: meeting.date.toString(),
        };
    }

    convertOutbound(meeting: Meeting): MeetingDto {
        return {
            id: meeting.id,
            attendee: meeting.attendee as Partial<UserDto>,
            organizer: meeting.organizer as Partial<UserDto>,
            date: +meeting.date,
            state: MeetingState[meeting.state],
        };
    }

    convertOutboundCollection(meetings: Meeting[]): MeetingDto[] {
        return meetings.map((m) => this.convertOutbound(m));
    }
}
