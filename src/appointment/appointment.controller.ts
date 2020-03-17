import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AppointmentDtoConverter } from './converter/appointmentDto.converter';
import { AppointmentDto } from './model/appointment.dto';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDtoConverter } from './converter/createAppointmentDto.converter';
import { CreateAppointmentDto } from './model/createAppointment.dto';
import { UpdateAppointmentDtoConverter } from './converter/updateAppointmentDto.converter';
import { UpdateAppointmentDto } from './model/updateAppointment.Dto';

@ApiUseTags('appointments')
@Controller('appointments')
export class AppointmentsController {

    constructor(
        private readonly service: AppointmentsService, 
        private readonly appointmentDtoConverter: AppointmentDtoConverter,
        private readonly createAppointmentDtoConverter: CreateAppointmentDtoConverter,
        private readonly updateAppointmentDtoConverter: UpdateAppointmentDtoConverter
    ) { }
    
    //@UseGuards(AuthGuard('auth'))
    @Get('')
    @ApiResponse({ status: 201, description: 'All appointments', type: AppointmentDto, isArray: true})
    @ApiResponse({ status: 401, description: 'Appointment not authentificated'})
    async getAll(): Promise<AppointmentDto[]> {
        const appointments: Appointment[] = await this.service.getAppointments();
        return this.appointmentDtoConverter.convertOutboundCollection(appointments);
    }

   // @UseGuards(AuthGuard('auth'))
    @Get('me')
    @ApiResponse({ status: 201, description: 'Appointment found', type: AppointmentDto})
    @ApiResponse({ status: 401, description: 'Appointment not authentificated'})
    async getProfile(@Request() req: any): Promise<AppointmentDto> {
        return this.appointmentDtoConverter.convertOutbound(req.appointment);
    }

    //@UseGuards(AuthGuard('auth'))
    @Get(':id')
    @ApiImplicitParam({name: 'id', description: 'Appointment id to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Appointment found', type: AppointmentDto})
    @ApiResponse({ status: 401, description: 'Appointment not authentificated'})
    @ApiResponse({ status: 404, description: 'Appointment not found'})
    async get(@Param('id', new ParseIntPipe()) id: number): Promise<AppointmentDto> {
        const appointment: Appointment = await this.service.getAppointmentById(id);
        return this.appointmentDtoConverter.convertOutbound(appointment);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateAppointmentDto', description: 'Appointment to create', type: CreateAppointmentDto})
    @ApiResponse({ status: 201, description: 'Appointment found', type: AppointmentDto})
    @ApiResponse({ status: 401, description: 'Appointment not authentificated'})
    async create(@Body() appointment: CreateAppointmentDto): Promise<AppointmentDto> {
        const appointmentToCreate: Partial<Appointment> = this.createAppointmentDtoConverter.convertInbound(appointment);
        const createdAppointment: Appointment = await this.service.createAppointment(appointmentToCreate);
        return this.appointmentDtoConverter.convertOutbound(createdAppointment);
    }

    //@UseGuards(AuthGuard('auth'))
    @Post(':id')
    @ApiImplicitParam({name: 'id', description: 'Appointment id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateAppointmentDto', description: 'Appointment information to update', type: UpdateAppointmentDto})
    @ApiResponse({ status: 201, description: 'Appointment updated', type: AppointmentDto})
    @ApiResponse({ status: 401, description: 'Appointment not authentificated'})
    @ApiResponse({ status: 404, description: 'Appointment not found'})
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() appointment: UpdateAppointmentDto): Promise<AppointmentDto> {
        const appointmentToUpdate: Partial<Appointment> = this.updateAppointmentDtoConverter.convertInbound(appointment);
        const appointmentUpdated: Appointment = await this.service.updateAppointment(id, appointmentToUpdate);
        return this.appointmentDtoConverter.convertOutbound(appointmentUpdated);
    }

    //@UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'Appointment id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Appointment deleted'})
    @ApiResponse({ status: 401, description: 'Appointment not authentificated'})
    @ApiResponse({ status: 404, description: 'Appointment not found'})
    async deleteAppointment(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteAppointment(id);
    }
}
