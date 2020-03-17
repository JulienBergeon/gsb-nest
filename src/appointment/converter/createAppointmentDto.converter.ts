import { CreateAppointmentDto } from "../model/createAppointment.dto";
import { Appointment } from "../appointment.entity";
import { Converter } from "../../common/converter";
import { RoleEnum } from "../../common/role.enum";
import { GenderEnum } from "../../common/gender.enum";

export class CreateAppointmentDtoConverter implements Converter<CreateAppointmentDto, Partial<Appointment>>{
    
    constructor() {}

    convertInbound(appointment: CreateAppointmentDto): Partial<Appointment> {
        let appointmentToCreate = {
            date: appointment.date,
            description: appointment.description,
        }

        return appointmentToCreate;
    }
}