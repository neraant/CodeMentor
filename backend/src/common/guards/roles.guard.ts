import {
  type CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { type Request } from 'express';
import { JwtPayload } from '../types/jwt-payload.type';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../types/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as JwtPayload;

    if (!role.includes(user?.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
