import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail } from "class-validator";

export class UpdateAppointmentDto {
    @ApiModelProperty({required: false})
    @IsEmail()
    @IsOptional()
    name?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string;
}