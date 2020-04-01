import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateMedicinesDto {

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    price: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    image: string;
}