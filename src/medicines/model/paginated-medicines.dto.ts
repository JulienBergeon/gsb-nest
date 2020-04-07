import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';
import { MedicinesDto } from './medicines.dto';
import { PaginatedDto } from './../../common/dto/paginated.dto';
export class PaginatedMedicinesDto extends PaginatedDto<MedicinesDto> {
    @ApiModelProperty()
    @IsArray()
    elements: MedicinesDto[];

    @ApiModelProperty()
    @IsNumber()
    nbElements: number;
}
