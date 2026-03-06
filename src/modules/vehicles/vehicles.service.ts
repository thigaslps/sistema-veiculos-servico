import { Injectable } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { vehicle } from '@prisma/client';
import { VehicleReturnDto } from './vehicles.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class appVehicleService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async getVehicles(): Promise<VehicleReturnDto[]> {
    const vehicles = await this.vehiclesRepository.getVehicles();
    return vehicles;
  }

  async addVehicle(vehicle: CreateVehicleDto): Promise<VehicleReturnDto> {
    const newVehicle = await this.vehiclesRepository.addVehicle(vehicle);
    return newVehicle;
  }

  async deleteVehicle(id: number) {
    const deletedVehicle = await this.vehiclesRepository.deleteVehicle(id);
    return deletedVehicle;
  }

  async deleteVehicleImage(id: number) {
    const deletedImage = await this.vehiclesRepository.deleteVehicleImage(id);
    return deletedImage;
  }

  async updateVehicle(id: number, vehicle: CreateVehicleDto): Promise<VehicleReturnDto> {
    const updatedVehicle = await this.vehiclesRepository.updateVehicle(id, vehicle);
    return updatedVehicle;
  }

  async getVehicle(id: number): Promise<VehicleReturnDto> {
    const vehicle = await this.vehiclesRepository.getVehicle(id);
    return vehicle;
  }
}
