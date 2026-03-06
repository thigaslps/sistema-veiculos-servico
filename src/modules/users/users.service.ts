import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class appUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async loginUser(CreateLoginDto: CreateLoginDto): Promise<UserResponseDto> {
    const User = await this.usersRepository.loginUser(CreateLoginDto);
    if (!User) {
      throw new Error('Email inválido ou senha inválida!');
    }
    return new UserResponseDto({
      id: User.user.id,
      email: User.user.email,
      accessToken: User.accessToken,
    });
  }

  async createUser(CreateLoginDto: CreateLoginDto): Promise<UserResponseDto> {
    const User = await this.usersRepository.createUser(CreateLoginDto);
    return new UserResponseDto({
      id: User.id,
      email: User.email,
    });
  }
}
