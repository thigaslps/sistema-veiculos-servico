import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
