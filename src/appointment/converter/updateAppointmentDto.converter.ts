import { Converter } from "src/common/converter";
import { UpdateAppointmentDto } from "../model/updateAppointment.Dto";
import { Appointment } from "../appointment.entity";

export class UpdateAppointmentDtoConverter implements Converter<UpdateAppointmentDto, Partial<Appointment>>{
    constructor() {}

    convertInbound(appointment: UpdateAppointmentDto): Partial<Appointment> {
        return appointment as Partial<Appointment>;
    }
}