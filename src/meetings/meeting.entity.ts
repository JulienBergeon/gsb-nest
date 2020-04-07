import { MeetingState } from './model/state.enum';
import { IsNumber, IsString } from 'class-validator';
import { Entity, OneToOne, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './../users/user.entity';

@Entity()
export class Meeting {

    @PrimaryGeneratedColumn('increment')
    @IsNumber()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    attendee: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    organizer: number;

    @Column({ type: Number })
    @IsNumber()
    state = MeetingState.Pending;

    @Column({ type: String})
    @IsString()
    date: string;
}
