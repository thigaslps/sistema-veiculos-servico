import {
  Body,
  Controller,
  Post,
  HttpCode,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { appUserService } from './users.service';
import { CreateLoginDto } from './dto/create-login-user.dto';
import { ApiResponse } from './dto/api-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import type { Response } from 'express';

@Controller('users')
export class appUserController {
  constructor(private readonly appUserService: appUserService) {}

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() dto: CreateLoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const user = await this.appUserService.loginUser(dto);

      if (!user) {
        throw new UnauthorizedException({
          status: 'error',
          message: 'Email ou senha inválidos',
        });
      }
        res.cookie('authToken', user.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000, // 24 horas
        });
      const { accessToken, ...userWithoutToken } = user;
      return new ApiResponse('success', 'Login bem sucedido', userWithoutToken);
    } catch (error) {
      throw error
    }
  }

  @Post('register')
  async createUser(@Body() CreateLoginDto: CreateLoginDto) {
    try {
      const user = await this.appUserService.createUser(CreateLoginDto);
      return new ApiResponse<UserResponseDto>(
        'success',
        'Usuário criado com sucesso!',
        user,
      );
    } catch (error) {
      throw error;
    }
  }
}
