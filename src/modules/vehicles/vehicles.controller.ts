import {
  Body,
  Controller,
  Post,
  HttpCode,
  UnauthorizedException,
  Res,
  Get,
  UseInterceptors,
  Delete,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import { appVehicleService } from './vehicles.service';
import { ApiResponse } from './dto/api-response.dto';
import type { Response } from 'express';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class appVehicleController {
  constructor(private readonly appVehicleService: appVehicleService) {}

  @Get()
  @HttpCode(200)
  async getVehicles(@Res({ passthrough: true }) res: Response, @Req() req: Request,) {
    try {
      const user = req['user'];
      console.log(user)
      const vehicles = await this.appVehicleService.getVehicles(user.id);
      return new ApiResponse(
        'success',
        'Busca de veículos realizada com sucesso!',
        vehicles,
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('add')
  @HttpCode(201)
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        fieldSize: 100 * 1024 * 1024,
      },
    }),
  )
  async addVehicle(@Body() vehicle: CreateVehicleDto) {
    try {
      const newVehicle = await this.appVehicleService.addVehicle(vehicle);
      return new ApiResponse(
        'success',
        'Veículo adicionado com sucesso!',
        newVehicle,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async deleteVehicle(@Param('id') id: number) {
    try {
      const deletedVehicle = await this.appVehicleService.deleteVehicle(id);
      return deletedVehicle;
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-image/:id')
  @HttpCode(200)
  async deleteVehicleImage(@Param('id') id: number) {
    try {
      const deletedImage = await this.appVehicleService.deleteVehicleImage(id);
      return deletedImage;
    } catch (error) {
      throw error;
    }
  }

  @Put('edit/:id')
  @HttpCode(201)
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        fieldSize: 100 * 1024 * 1024,
      },
    }),
  )
  async updateVehicle(
    @Param('id') id: number,
    @Body() vehicle: UpdateVehicleDto,
  ) {
    try {
      const updatedVehicle = await this.appVehicleService.updateVehicle(
        id,
        vehicle,
      );
      return new ApiResponse(
        'success',
        'Veículo atualizado com sucesso!',
        updatedVehicle,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getVehicle(@Param('id') id: number) {
    try {
      const vehicle = await this.appVehicleService.getVehicle(id);
      return new ApiResponse(
        'success',
        'Busca de veículo realizada com sucesso!',
        vehicle,
      );
    } catch (error) {
      throw error;
    }
  }
}
