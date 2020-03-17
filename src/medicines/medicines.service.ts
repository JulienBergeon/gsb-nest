import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { Medicines } from './medicines.entity';
import { RoleEnum } from '../common/role.enum';

@Injectable()
export class MedicinesService {

    constructor(@InjectRepository(Medicines) private medicinesRepository: Repository<Medicines>) { }

    async getMedicines(): Promise<Medicines[]> {
        return await this.medicinesRepository.find({
        });
    }

    async getMedicinesById(id: number): Promise<Medicines> {
        const medicines: Medicines | undefined = await this.medicinesRepository.findOne({
            where: [{ id }]
        });
        
        if (!medicines) {
            throw new NotFoundException("Ce medicament n'existe pas");
        }
        return medicines;
    }

    async createMedicines(medicines: Partial<Medicines>): Promise<Medicines> {
        const medicinesCreated: Medicines = this.medicinesRepository.create(medicines);
        return this.medicinesRepository.save(medicinesCreated);
    }

    async updateMedicines(id: number, medicines: Partial<Medicines>): Promise<Medicines> {

        const result: UpdateResult = await this.medicinesRepository.update(id, medicines);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException("Ce medicament n'existe pas.");
        }
        return await this.getMedicinesById(id);
    }

    async deleteMedicines(id: number): Promise<void> {
        const medicines: Medicines | undefined = await this.getMedicinesById(id);
        if (!medicines) {
            throw new NotFoundException("Ce medicament n'existe pas.");
        }
        await this.medicinesRepository.delete(medicines.id);
    }
}
