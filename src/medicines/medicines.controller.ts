import { PaginatedDto } from './../common/dto/paginated.dto';
import { PaginatedDtoConverter } from './../common/converter/paginated.converter';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { MedicinesDtoConverter } from './converter/medicinesDto.converter';
import { MedicinesDto } from './model/medicines.dto';
import { Medicines } from './medicines.entity';
import { MedicinesService } from './medicines.service';
import { CreateMedicinesDtoConverter } from './converter/createMedicinesDto.converter';
import { CreateMedicinesDto } from './model/createMedicines.dto';
import { UpdateMedicinesDtoConverter } from './converter/updateMedicinesDto.converter';
import { UpdateMedicinesDto } from './model/updateMedicines.Dto';

@ApiUseTags('medicines')
@Controller('medicines')
export class MedicinesController {

    constructor(
        private readonly service: MedicinesService, 
        private readonly medicinesDtoConverter: MedicinesDtoConverter,
        private readonly createMedicinesDtoConverter: CreateMedicinesDtoConverter,
        private readonly updateMedicinesDtoConverter: UpdateMedicinesDtoConverter,
        private readonly paginatedDtoConverter: PaginatedDtoConverter,
    ) { }
    
    //@UseGuards(AuthGuard('auth'))
    @Get('')
    @ApiImplicitQuery({ name: 'pageIndex', type: Number, description: 'Page index for pagination' })
    @ApiImplicitQuery({ name: 'pageSize', type: Number, description: 'Page size for pagination' })
    @ApiImplicitQuery({ name: 'search', type: String, description: 'Search field' })
    @ApiResponse({ status: 201, description: 'All medicines', type: MedicinesDto, isArray: true})
    @ApiResponse({ status: 401, description: 'Medicines not authentificated'})
    async getAll(
        @Query('pageIndex', new ParseIntPipe()) pageIndex: number,
        @Query('pageSize', new ParseIntPipe()) pageSize: number,
        @Query('search') search: string,
    ): Promise<PaginatedDto<MedicinesDto>> {
        const [medicines, nbMedicines] = await this.service.getMedicines(pageIndex, pageSize, search);
        const medicinesDto: MedicinesDto[] = this.medicinesDtoConverter.convertOutboundCollection(medicines);
        return this.paginatedDtoConverter.convertOutbound([medicinesDto, nbMedicines]);
    }

   // @UseGuards(AuthGuard('auth'))
    // @Get('me')
    // @ApiResponse({ status: 201, description: 'User found', type: MedicinesDto})
    // @ApiResponse({ status: 401, description: 'User not authentificated'})
    // async getProfile(@Request() req: any): Promise<MedicinesDto> {
    //     return this.medicinesDtoConverter.convertOutbound(req.medicines);
    // }

    // //@UseGuards(AuthGuard('auth'))
    // @Get('patients')
    // @ApiResponse({ status: 201, description: 'Patients found', type: UserDto, isArray: true})
    // @ApiResponse({ status: 401, description: 'User not authentificated'})
    // async getPatients(): Promise<UserDto[]> {
    //     const patients: User[] = await this.service.getPatients();
    //     return this.userDtoConverter.convertOutboundCollection(patients);
    // }

    //@UseGuards(AuthGuard('auth'))
    // @Get('doctors')
    // @ApiResponse({ status: 201, description: 'Doctors found', type: UserDto, isArray: true})
    // @ApiResponse({ status: 401, description: 'User not authentificated'})
    // async getDoctors(): Promise<UserDto[]> {
    //     const doctors: User[] = await this.service.getDoctors();
    //     return this.userDtoConverter.convertOutboundCollection(doctors);
    // }

    //@UseGuards(AuthGuard('auth'))
    @Get(':id')
    @ApiImplicitParam({name: 'id', description: 'Medicines id to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Medicines found', type: MedicinesDto})
    @ApiResponse({ status: 401, description: 'Medicines not authentificated'})
    @ApiResponse({ status: 404, description: 'Medicines not found'})
    async get(@Param('id', new ParseIntPipe()) id: number): Promise<MedicinesDto> {
        const medicines: Medicines = await this.service.getMedicinesById(id);
        return this.medicinesDtoConverter.convertOutbound(medicines);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateMedicinesDto', description: 'Medicines to create', type: CreateMedicinesDto})
    @ApiResponse({ status: 201, description: 'Medicines found', type: MedicinesDto})
    @ApiResponse({ status: 401, description: 'Medicines not authentificated'})
    async create(@Body() medicines: CreateMedicinesDto): Promise<MedicinesDto> {
        const medicinesToCreate: Partial<Medicines> = this.createMedicinesDtoConverter.convertInbound(medicines);
        const createdMedicines: Medicines = await this.service.createMedicines(medicinesToCreate);
        return this.medicinesDtoConverter.convertOutbound(createdMedicines);
    }

    //@UseGuards(AuthGuard('auth'))
    @Post(':id')
    @ApiImplicitParam({name: 'id', description: 'Medicines id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateMedicinesDto', description: 'Medicines information to update', type: UpdateMedicinesDto})
    @ApiResponse({ status: 201, description: 'Medicines updated', type: MedicinesDto})
    @ApiResponse({ status: 401, description: 'Medicines not authentificated'})
    @ApiResponse({ status: 404, description: 'Medicines not found'})
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() medicines: UpdateMedicinesDto): Promise<MedicinesDto> {
        const medicinesToUpdate: Partial<Medicines> = this.updateMedicinesDtoConverter.convertInbound(medicines);
        const medicinesUpdated: Medicines = await this.service.updateMedicines(id, medicinesToUpdate);
        return this.medicinesDtoConverter.convertOutbound(medicinesUpdated);
    }

    //@UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'Medicines id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Medicines deleted'})
    @ApiResponse({ status: 401, description: 'Medicines not authentificated'})
    @ApiResponse({ status: 404, description: 'Medicines not found'})
    async deleteMedicines(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteMedicines(id);
    }
}