import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthCookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = ['/users/login', '/users/register'];
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const token = req.cookies['authToken'];
    if (!token) {
      throw new UnauthorizedException({
        status: 'token error',
        message: 'Token não encontrado',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException({
        status: 'token error',
        message: 'Token inválido',
      });
    }
  }
}