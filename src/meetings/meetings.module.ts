import { MeetingDtoConverter } from './converter/meetingDto.converter';
import { CreateMeetingDtoConverter } from './converter/createMeetingDto.converter';
import { Meeting } from './meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  controllers: [MeetingsController],
  providers: [
    MeetingsService,
    CreateMeetingDtoConverter,
    MeetingDtoConverter,
  ],
})
export class MeetingsModule {}
