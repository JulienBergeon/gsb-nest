import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "../../common/gender.enum";
import { RoleEnum } from "../../common/role.enum";

export class CreateAppointmentDto {

    @ApiModelProperty()
    @IsString()
    date: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    description: string;
}