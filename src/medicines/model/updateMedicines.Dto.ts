import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateMedicinesDto {
    @ApiModelProperty({required: false})
    @IsEmail()
    @IsOptional()
    name?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    price?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    image?: string;
}