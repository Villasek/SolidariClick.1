import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class Jwt extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: '46c3d364-f03f-47b9-a2ce-5da27c0ab3c7',
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const { id } = payload;

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user || !user.isActive)
      throw new UnauthorizedException('Acceso denegado');
    return { ...user, password: null };
  }
}
