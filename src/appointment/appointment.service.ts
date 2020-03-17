import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { Appointment } from './appointment.entity';
import { RoleEnum } from '../common/role.enum';

@Injectable()
export class AppointmentsService {

    constructor(@InjectRepository(Appointment) private appointmentsRepository: Repository<Appointment>) { }

    async getAppointments(): Promise<Appointment[]> {
        return await this.appointmentsRepository.find({
            relations: ['doctors']
        });
    }

    async getAppointmentById(id: number): Promise<Appointment> {
        const appointment: Appointment | undefined = await this.appointmentsRepository.findOne({
            where: [{ id }],
            relations: ['doctors']
        });
        
        if (!appointment) {
            throw new NotFoundException("Cet utilisateur n'existe pas");
        }
        return appointment;
    }

    async getAppointmentByDate(date: string): Promise<Appointment> {
        return await this.appointmentsRepository.findOne({
            where: [{ date }],
            relations: ['doctors']
        });
    }

    async dateExists(date: string): Promise<boolean> {
        return !!await this.getAppointmentByDate(date);
    }

    async createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
        const dateExists = await this.dateExists(appointment.date);
        if (dateExists) {
            throw new ForbiddenException("Date occupée.");
        }

        const appointmentCreated: Appointment = this.appointmentsRepository.create(appointment);
        return this.appointmentsRepository.save(appointmentCreated);
    }

    // async checkAppointmentCredentials(date: string, password: string): Promise<Appointment | undefined> {
    //     const appointment: Appointment = await this.getAppointmentByDate(date);
    //     if (!appointment) {
    //         throw new UnauthorizedException("Cette date n'existe pas.");
    //     }
        
    //     const passwordMatch: boolean = await bcrypt.compare(password, appointment.password)
    //     if (!passwordMatch) {
    //         throw new UnauthorizedException("Mot de passe incorrect.");
    //     }
    //     return appointment;
    // }

    async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
        const result: UpdateResult = await this.appointmentsRepository.update(id, appointment);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException("Cette date n'existe pas.");
        }
        return await this.getAppointmentById(id);
    }

    async deleteAppointment(id: number): Promise<void> {
        const appointment: Appointment | undefined = await this.getAppointmentById(id);
        if (!appointment) {
            throw new NotFoundException("Cette date n'existe pas.");
        }
        await this.appointmentsRepository.delete(appointment.id);
    }

    // async getPatients(): Promise<Appointment[]>{
    //     return await this.appointmentsRepository.find({
    //         where: [{ role: '0' }]
    //     })
    // }

    // async getDoctors(): Promise<Appointment[]>{
    //     return await this.appointmentsRepository.find({
    //         where: [{ role: '1' }]
    //     })
    // }

    // async getPatientFromId(appointmentId: number): Promise<Appointment>{
    //     const patient: Appointment = await this.getAppointmentById(appointmentId);
    //     const isAppointmentPatient: boolean = patient.role === RoleEnum.Patient;
    //     if (!isAppointmentPatient) {
    //         throw new ForbiddenException("Cet utilisateur n'a pas le rôle patient.");
    //     }
    //     return patient;
    // }

    // async getDoctorFromId(appointmentId: number): Promise<Appointment>{
    //     const doctor: Appointment = await this.getAppointmentById(appointmentId);
    //     const isAppointmentDoctor: boolean = doctor.role === RoleEnum.Doctor;
    //     if (!isAppointmentDoctor) {
    //         throw new ForbiddenException("Cet utilisateur n'a pas le rôle médecin.");
    //     }
    //     return doctor;
    // }

    // private appointmentTokenIdMatchPatientId(appointmentTokenId: number, patientId: number): void {
    //     if (appointmentTokenId !== patientId) {
    //         throw new UnauthorizedException("Le token de cet utilisateur ne correspond pas à un patient.");
    //     }
    // }

    // async addDoctorToPatient(appointmentTokenId: number, patientId: number, doctorId: number): Promise<Appointment> {
    //     this.appointmentTokenIdMatchPatientId(appointmentTokenId, patientId);
    //     const patient: Appointment = await this.getPatientFromId(patientId);
    //     const doctor: Appointment = await this.getDoctorFromId(doctorId);
    //     if (patient.doctors.find(d => d.id === doctor.id)) {
    //         throw new ForbiddenException("Ce médecin est déjà attaché à ce patient.");
    //     }

    //     patient.doctors = patient.doctors.concat(doctor);
    //     return await this.appointmentsRepository.save(patient);
    // }

    // async removeDoctorToPatient(appointmentTokenId: number, patientId: number, doctorId: number): Promise<Appointment> {
    //     this.appointmentTokenIdMatchPatientId(appointmentTokenId, patientId);
    //     const patient: Appointment = await this.getPatientFromId(patientId);
    //     const doctor: Appointment = await this.getDoctorFromId(doctorId);

    //     if (!patient.doctors.find(d => d.id === doctor.id)) {
    //         throw new ForbiddenException("Ce médecin n'est pas attaché à ce patient.");
    //     }

    //     patient.doctors = patient.doctors.filter(d => d.id !== doctor.id);
    //     return await this.appointmentsRepository.save(patient);
    // }

    // async getAllDoctorPatients(doctorTokenId: number): Promise<Appointment[]> {
    //     await this.getDoctorFromId(doctorTokenId)
    //     const patients: Appointment[] = await this.getPatients();
    //     return patients.filter((p) => p.doctors.find(d => d.id === doctorTokenId));
    // }
}
