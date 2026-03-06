import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  mark!: string;

  @IsOptional()
  @IsString()
  model!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  year!: number;

  @IsOptional()
  @IsString()
  plate!: string;

  @IsOptional()
  @IsString()
  color!: string;

  @IsOptional()
  @IsString()
  type!: string;

  @IsOptional()
  @IsString()
  status!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  value!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id!: number;
  
  @IsArray()
  @IsOptional()
  photos!: string[];
}
