import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const roles: string[] = this.reflector.get('roles', context.getHandler());

    return !roles?.length
      ? true
      : roles.some((role) => user.roles.includes(role));
  }
}
