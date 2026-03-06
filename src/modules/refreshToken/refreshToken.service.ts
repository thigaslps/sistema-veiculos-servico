import { Injectable } from '@nestjs/common';
import { refreshTokenRepository } from './refreshToken.repository';

@Injectable()
export class appRefreshTokenService {
  constructor(private readonly refreshTokenRepository: refreshTokenRepository) {}

  async validateRefreshToken(authToken: string) {
    try {
      const tokenValidated = await this.refreshTokenRepository.validateRefreshToken(authToken);
      return tokenValidated;
    } catch (error) {
      throw error;
    }
  }
}
