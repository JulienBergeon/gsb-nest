import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '../common/gender.enum';
import { RoleEnum } from '../common/role.enum';
import { Medicine } from './../medicines/medicines.entity';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    email = '';

    @Column({ type: String })
    @IsString()
    password = '';

    @Column({ type: String })
    @IsString()
    firstName = '';

    @Column({ type: String })
    @IsString()
    lastName = '';

    @Column({ type: String })
    @IsString()
    address = '';

    @Column({ type: Number })
    @IsNumber()
    role = RoleEnum.Commercial;

    @Column({ type: Number })
    @IsNumber()
    gender = GenderEnum.Male;

    @OneToMany(() => Medicine, (medicine) => medicine.id)
    @JoinTable({name: 'medicineIds', joinColumn: {name: 'id'}})
    @Column({type: 'json'})
    medicines ?: Medicine[];
}
