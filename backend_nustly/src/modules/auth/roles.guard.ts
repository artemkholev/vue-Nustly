import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const reqiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!reqiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split('')[0];
      const token = authHeader.split('')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => reqiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
