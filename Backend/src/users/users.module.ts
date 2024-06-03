import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Jwt } from './jwt';
import { PrismaModule } from 'src/prisma.module';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    PrismaModule,
    passportModule,
    JwtModule.register({
      secret: '46c3d364-f03f-47b9-a2ce-5da27c0ab3c7',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Jwt],
  exports: [passportModule],
})
export class UsersModule {}
