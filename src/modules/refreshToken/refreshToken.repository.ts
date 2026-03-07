import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

export class refreshTokenRepository {
  async validateRefreshToken(authToken: string) {
    try {
      if (!authToken) {
        throw new BadRequestException({
          status: 'error',
          message: 'Token inválido!',
        });
      }
      const tokenValidade = jwt.verify(
        authToken,
        process.env.JWT_SECRET as string,
      );

      if (!tokenValidade) {
        throw new UnauthorizedException({
          status: 'error',
          message: 'Token inválido!',
        });
      }
      return {
        id: (tokenValidade as any).userId,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro interno ao validar token',
      });
    }
  }
}
