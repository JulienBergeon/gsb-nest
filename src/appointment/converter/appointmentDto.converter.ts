import { AppointmentDto } from '../model/appointment.dto';
import { Appointment } from '../appointment.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

export class AppointmentDtoConverter implements Converter<AppointmentDto, Appointment>{
    constructor() {}

    convertOutbound(appointment: Appointment): AppointmentDto {
        let appointmentDto: AppointmentDto = {
            id: appointment.id,
            date: appointment.date,
            description: appointment.description,
        };

        // if (appointment.role === RoleEnum.Patient) {
        //     appointmentDto['doctors'] = appointment.doctors.map(d => d.id);
        // }

        return appointmentDto;
    }

    convertOutboundCollection(appointments: Appointment[]): AppointmentDto[] {
        return appointments.map((appointment) => this.convertOutbound(appointment));
    }
}