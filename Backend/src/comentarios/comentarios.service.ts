import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class ComentariosService extends PrismaClient {
  async create(
    usuario: User,
    id: string,
    createComentarioDto: CreateComentarioDto,
  ) {
    const member = await this.opportunityMembers.findFirst({
      where: {
        userId: usuario.id,
        opportunityId: id,
      },
    });

    if (!member) {
      throw new BadRequestException('Usted no forma parte de esta actividad');
    }

    const comment = await this.comment.create({
      data: {
        comment: createComentarioDto.comment,
        userId: usuario.id,
        opportunityId: id,
      },
    });

    return comment;
  }

  findById(id: string) {
    return this.comment.findMany({
      where: {
        opportunityId: id,
        Opportunity: {
          isActive: true,
        },
      },
      include: {
        User: true,
      },
    });
  }
}
