import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './role.guard';

export const Auth = (...roles: string[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard(), RoleGuard),
  );
};
