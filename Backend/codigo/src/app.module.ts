import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OportunidadesModule } from './oportunidades/oportunidades.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ImagenesModule } from './imagenes/imagenes.module';

@Module({
  imports: [UsersModule, OportunidadesModule, ComentariosModule, ImagenesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
