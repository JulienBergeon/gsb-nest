import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MedicinesModule } from './medicines/medicines.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { configService } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController} from './auth/auth.controller';
import { Appointment } from './appointment/appointment.entity';
import { AppointmentsModule } from './appointment/appointment.module';


const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'gsb',
  entities: ['src/**/**.entity{.ts,.js}'],
  logging: true,
  synchronize: true,
}

@Module({
  imports: [    
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    MedicinesModule,
    AppointmentsModule,
    AuthModule,
    PatientModule,
    DoctorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
