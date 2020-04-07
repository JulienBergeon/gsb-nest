import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { MedicinesModule } from './medicines/medicines.module';
import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';

const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'gsb',
  entities: ['src/**/**.entity{.ts,.js}'],
  logging: true,
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    MedicinesModule,
    AppointmentsModule,
    AuthModule,
    DoctorModule,
    MeetingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
