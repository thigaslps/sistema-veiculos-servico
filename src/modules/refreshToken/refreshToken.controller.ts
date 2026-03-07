import {
  Body,
  Controller,
  Post,
  HttpCode,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { appRefreshTokenService } from './refreshToken.service';
import { ApiResponse } from './dto/api-response.dto';

@Controller('refreshToken')
export class appRefreshTokenController {
  constructor(
    private readonly appRefreshTokenService: appRefreshTokenService,
  ) {}

  @Post('validate')
  @HttpCode(200)
  async validateRefreshToken(@Req() req: Request) {
    try {
      const authToken = req.cookies.authToken;
      const user = await this.appRefreshTokenService.validateRefreshToken(authToken);
      return new ApiResponse('success', 'Token válido', user);
    } catch (error) {
      throw error;
    }
  }
}
