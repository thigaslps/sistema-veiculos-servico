import { Module } from '@nestjs/common';
import { appUserController } from './users.controller';
import { appUserService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [],
  controllers: [appUserController],
  providers: [appUserService, UsersRepository],
})
export class appUserModule {}
