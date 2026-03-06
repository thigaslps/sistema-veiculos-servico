import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { appUserModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { appRefreshTokenModule } from './modules/refreshToken/refreshToken.module';
import { appLogoutModule } from './modules/logout/refreshToken.module';
import { appVehicleModule } from './modules/vehicles/vehicles.module';
import { AuthCookieMiddleware } from 'middleware';
import { appVehicleController } from './modules/vehicles/vehicles.controller';
@Module({
  imports: [
    appUserModule,
    appRefreshTokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    appUserModule,
    appLogoutModule,
    appVehicleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthCookieMiddleware)
      .forRoutes(appVehicleController);
  }
}
