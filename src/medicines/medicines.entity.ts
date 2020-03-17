import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicines {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    name = '';

    @Column({ type: String })
    @IsString()
    description = '';

    @Column({ type: Number })
    @IsNumber()
    price: number;

    @Column({ type: String })
    @IsString()
    image = '';
}