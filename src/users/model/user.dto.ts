import { MedicinesDto } from './../../medicines/model/medicines.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsJSON } from 'class-validator';
import { GenderEnum } from '../../common/gender.enum';
import { RoleEnum } from '../../common/role.enum';

export class UserDto {
    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsString()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    lastName: string;

    @ApiModelProperty()
    @IsString()
    address: string;

    @ApiModelProperty({enum: Object.keys(RoleEnum).filter((v) => isNaN(+v))})
    @IsString()
    role: string;

    @ApiModelProperty({enum: Object.keys(GenderEnum).filter((v) => isNaN(+v))})
    @IsString()
    gender: string;

    @ApiModelProperty({ type: MedicinesDto, isArray: true})
    @IsJSON()
    medicines: MedicinesDto[];
}
