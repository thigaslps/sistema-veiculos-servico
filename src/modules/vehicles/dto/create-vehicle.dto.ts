import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  mark!: string;

  @IsString()
  model!: string;

  @Type(() => Number)
  @IsNumber()
  year!: number;

  @IsString()
  plate!: string;

  @IsString()
  color!: string;

  @Type(() => Number)
  @IsNumber()
  value!: number;

  @IsString()
  type!: string;

  @IsString()
  status!: string;

  @Type(() => Number)
  @IsNumber()
  user_id!: number;

  @IsArray()
  @IsOptional()
  photos!: string[];
}
