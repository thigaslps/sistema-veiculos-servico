import { Module } from '@nestjs/common';
import { appVehicleController } from './vehicles.controller';
import { appVehicleService } from './vehicles.service';
import { VehiclesRepository } from './vehicles.repository';

@Module({
  imports: [],
  controllers: [appVehicleController],
  providers: [appVehicleService, VehiclesRepository],
})
export class appVehicleModule {}
