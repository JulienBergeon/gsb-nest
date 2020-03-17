import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '../common/gender.enum';
import { RoleEnum } from '../common/role.enum';
@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    date = '';

    @Column({ type: String })
    @IsString()
    description? = '';
}