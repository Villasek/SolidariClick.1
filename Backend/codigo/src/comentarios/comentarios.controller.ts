import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { Auth } from 'src/users/auth.decorator';
import { User } from 'src/users/user.decorator';
import { User as TUser } from '@prisma/client';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post('/comentar/:id')
  @Auth()
  create(
    @User() usuario: TUser,
    @Param('id') id: string,
    @Body() createComentarioDto: CreateComentarioDto,
  ) {
    return this.comentariosService.create(usuario, id, createComentarioDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.comentariosService.findById(id);
  }
}
