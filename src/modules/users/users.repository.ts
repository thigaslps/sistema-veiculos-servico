import { Injectable, UnauthorizedException } from '@nestjs/common';
import { prisma } from '../../model/db/prisma.service';
import { ConflictException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { CreateLoginDto } from './dto/create-login-user.dto';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  async loginUser(
    dto: CreateLoginDto,
  ): Promise<{ user: user; accessToken: string } | null> {
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException({
        status: 'error',
        message: 'Email ou senha inválidos',
      });
    }
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    return {
      user,
      accessToken,
    };
  }
  async createUser(CreateLoginDto: CreateLoginDto): Promise<user> {
    const hashedPassword = await bcrypt.hash(CreateLoginDto.password, 10);
    const existsUser = await prisma.user.findUnique({
      where: { email: CreateLoginDto.email },
    });
    if (existsUser) {
      throw new ConflictException({
        status: 'error',
        message: 'Email já registrado no sistema!',
      });
    }
    return prisma.user.create({
      data: {
        ...CreateLoginDto,
        password: hashedPassword,
      },
    });
  }
}
