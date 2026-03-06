import { Module } from '@nestjs/common';
import { appRefreshTokenController } from './refreshToken.controller';
import { appRefreshTokenService } from './refreshToken.service';
import { refreshTokenRepository } from './refreshToken.repository';


@Module({
  imports: [],
  controllers: [appRefreshTokenController],
  providers: [appRefreshTokenService, refreshTokenRepository],
})
export class appRefreshTokenModule {}
