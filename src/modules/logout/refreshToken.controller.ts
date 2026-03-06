import {
  Controller,
  Post,
  HttpCode,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiResponse } from './dto/api-response.dto';

@Controller('logout')
export class appLogoutController {

  @Post()
  @HttpCode(200)
  async validateRefreshToken(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('authToken');
      return new ApiResponse('success', 'Logout realizado com sucesso');
    } catch (error) {
      throw error;
    }
  }
}
