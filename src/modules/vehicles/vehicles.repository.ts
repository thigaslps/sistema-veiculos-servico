import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '../../model/db/prisma.service';
import { vehicle } from '@prisma/client';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { ApiResponse } from './dto/api-response.dto';

// DTO de retorno customizado
export type VehicleReturnDto = Omit<vehicle, 'user_id' | 'value'> & {
  value: string;
  photos: string[];
  idPhotos?: number[];
};

@Injectable()
export class VehiclesRepository {
  // Buscar todos os veiculos
  async getVehicles(userId: number): Promise<VehicleReturnDto[]> {
    try {
      const vehicles = await prisma.vehicle.findMany({
        where: {
          user_id: userId,
        },
      });
      const allPhotos = await prisma.vehicle_photos.findMany();

      const vehiclesFormatted: VehicleReturnDto[] = vehicles.map((v) => {
        const photos = allPhotos
          .filter((p) => p.vehicle_id === v.id)
          .map((p) => p.url);

        const idPhotos = allPhotos
          .filter((p) => p.vehicle_id === v.id)
          .map((p) => p.id);

        // Formata o valor
        const valueBRL = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(v.value));

        const { user_id, value, ...rest } = v;

        return {
          ...rest,
          value: valueBRL,
          photos,
          idPhotos,
        };
      });

      return vehiclesFormatted;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro ao buscar veículos',
      });
    }
  }

  // criar novo veiculo
  async addVehicle(data: CreateVehicleDto): Promise<VehicleReturnDto> {
    try {
      let idPhotos: number[] = [];
      const newVehicle = await prisma.vehicle.create({
        data: {
          mark: data.mark,
          model: data.model,
          year: data.year,
          plate: data.plate,
          color: data.color,
          value: data.value,
          type: data.type,
          status: data.status,
          user_id: data.user_id,
        },
      });

      // adiciona fts se existirem
      if (data.photos && data.photos.length > 0) {
        for (const url of data.photos) {
          const photo = await prisma.vehicle_photos.create({
            data: {
              vehicle_id: newVehicle.id,
              url,
            },
          });
          idPhotos.push(photo.id);
        }
      }

      // busca fotos vinculadas
      const photos = data.photos || [];

      // formata valor
      const valueBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(newVehicle.value));

      const { user_id, value, ...rest } = newVehicle;

      return {
        ...rest,
        value: valueBRL,
        photos,
        idPhotos,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro ao adicionar veículo',
      });
    }
  }

  // deleta veiculo
  async deleteVehicle(id: number) {
    try {
      const deletedVehicle = await prisma.vehicle.delete({
        where: { id },
      });

      // busca fotos vinculadas
      const photos = await prisma.vehicle_photos.findMany({
        where: { vehicle_id: id },
      });

      if (photos) {
        await prisma.vehicle_photos.deleteMany({
          where: { vehicle_id: id },
        });
      }

      return new ApiResponse(
        'success',
        'Veículo deletado com sucesso!',
        deletedVehicle,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro ao deletar veículo',
      });
    }
  }

  // deleta foto do veiculo
  async deleteVehicleImage(id: number) {
    try {
      const deletedImage = await prisma.vehicle_photos.delete({
        where: { id },
      });

      return new ApiResponse(
        'success',
        'Foto do veículo deletada com sucesso!',
        deletedImage,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro ao deletar foto do veículo',
      });
    }
  }

  // atualizar veiculo
  async updateVehicle(
    id: number,
    data: CreateVehicleDto,
  ): Promise<VehicleReturnDto> {
    try {
      let idPhotos: number[] = [];
      const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: {
          mark: data.mark,
          model: data.model,
          year: data.year,
          plate: data.plate,
          color: data.color,
          value: data.value,
          type: data.type,
          status: data.status,
          user_id: data.user_id,
        },
      });

      // adiciona fts se existirem
      if (data.photos && data.photos.length > 0) {
        for (const url of data.photos) {
          const existsPhoto = await prisma.vehicle_photos.findFirst({
            where: { url, vehicle_id: updatedVehicle.id },
          });

          if (existsPhoto) {
            idPhotos.push(existsPhoto.id);
            continue;
          }

          if (!existsPhoto) {
            const photo = await prisma.vehicle_photos.create({
              data: {
                vehicle_id: updatedVehicle.id,
                url,
              },
            });
            idPhotos.push(photo.id);
          }
        }
      }

      // busca fotos vinculadas
      const photos = data.photos || [];

      // formata valor
      const valueBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(updatedVehicle.value));

      const { user_id, value, ...rest } = updatedVehicle;

      return {
        ...rest,
        value: valueBRL,
        photos,
        idPhotos,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro ao atualizar veículo',
      });
    }
  }

  // buscar veiculo por id
  async getVehicle(id: number): Promise<VehicleReturnDto> {
    try {
      const vehicle = await prisma.vehicle.findFirst({
        where: { id },
        include: {
          vehicle_photos: false,
        },
      });

      if (!vehicle) {
        throw new NotFoundException({
          status: 'error',
          message: 'Veículo não encontrado',
        });
      }

      const photos = await prisma.vehicle_photos.findMany({
        where: { vehicle_id: id },
      });



      // formata valor
      const valueBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(vehicle.value));

      const { user_id, value, ...rest } = vehicle;

      return {
        ...rest,
        value: valueBRL,
        photos: photos.map((photo) => photo.url),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Erro ao buscar veículo',
      });
    }
  }
}
