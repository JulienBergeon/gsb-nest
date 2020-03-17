import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateMedicinesDto {

    @ApiModelProperty()
    @IsEmail()
    name: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    image: string;
}