import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsEmail } from "class-validator";

export class AppointmentDto {
    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsEmail()
    date: string;

    @ApiModelProperty()
    @IsString()
    description: string;
}