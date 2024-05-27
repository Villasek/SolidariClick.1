import { Module } from '@nestjs/common';
import { OportunidadesService } from './oportunidades.service';
import { OportunidadesController } from './oportunidades.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [OportunidadesController],
  providers: [OportunidadesService],
})
export class OportunidadesModule {}
