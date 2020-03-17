import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentDtoConverter } from './converter/appointmentDto.converter';
import { CreateAppointmentDtoConverter } from './converter/createAppointmentDto.converter';
import { UpdateAppointmentDtoConverter } from './converter/updateAppointmentDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [
    AppointmentsService, 
    AppointmentDtoConverter,
    CreateAppointmentDtoConverter,
    UpdateAppointmentDtoConverter
  ],
  controllers: [AppointmentsController],
  exports: [
    AppointmentsService,
    AppointmentDtoConverter,
    CreateAppointmentDtoConverter,
  ]
})
export class AppointmentsModule {}
