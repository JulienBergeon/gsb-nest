import { CommonModule } from './../common/common.module';
import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicines } from './medicines.entity';
import { MedicinesDtoConverter } from './converter/medicinesDto.converter';
import { CreateMedicinesDtoConverter } from './converter/createMedicinesDto.converter';
import { UpdateMedicinesDtoConverter } from './converter/updateMedicinesDto.converter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicines]),
    CommonModule,
  ],
  providers: [
    MedicinesService,
    MedicinesDtoConverter,
    CreateMedicinesDtoConverter,
    UpdateMedicinesDtoConverter,
  ],
  controllers: [MedicinesController],
  exports: [
    MedicinesService,
    MedicinesDtoConverter,
    CreateMedicinesDtoConverter,
  ]
})
export class MedicinesModule {}
