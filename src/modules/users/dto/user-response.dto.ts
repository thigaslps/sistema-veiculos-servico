import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  id!: number;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
