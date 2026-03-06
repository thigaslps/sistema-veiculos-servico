import { Module } from '@nestjs/common';
import { appLogoutController } from './refreshToken.controller';



@Module({
  imports: [],
  controllers: [appLogoutController],
  providers: [],
})
export class appLogoutModule {}
