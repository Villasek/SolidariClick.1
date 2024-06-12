import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOportunidadeDto } from './dto/create-oportunidade.dto';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { type User } from '@prisma/client';
import { PostularDto } from './dto/postular.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class OportunidadesService extends PrismaClient {
  async create(
    createOportunidadeDto: CreateOportunidadeDto,
    file: Express.Multer.File,
    usuario: User,
  ) {
    const idOportunidad = uuid();
    const imagen = `${idOportunidad}.${file.originalname.split('.').pop()}`;

    // Convertir categoryId a número
    const categoryId = parseInt(createOportunidadeDto.categoryId, 10);
    if (isNaN(categoryId)) {
      throw new BadRequestException('Invalid category ID');
    }

    try {
      const oportunidad = await this.opportunity.create({
        data: {
          name: createOportunidadeDto.name,
          description: createOportunidadeDto.description,
          date: createOportunidadeDto.date,
          location: createOportunidadeDto.location,
          image: imagen,
          userId: usuario.id,
          categoryId: categoryId,
          points: +createOportunidadeDto.points
        },
      });

      fs.writeFileSync(
        path.join(__dirname, `../../../images/${imagen}`),
        file.buffer,
      );

      return oportunidad;
    } catch (error) {
      console.error('Error creating opportunity:', error);
      throw new BadRequestException('Error creating opportunity');
    }
  }

  findAll() {
    return this.opportunity.findMany({
      include: {
        User: true,
      },
    });
  }

  findByCategory(categoryId: number) {
    return this.opportunity.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        User: true,
      },
    });
  }

  findOne(id: string) {
    return this.opportunity.findFirst({
      where: { id, isActive: true },
      include: {
        User: true,
      },
    });
  }

  findRequestsForCompany(userId: string) {
    return this.opportunityMembers.findMany({
      where: {
        Opportunity: {
          userId: userId,
        },
      },
      include: {
        Opportunity: true,
        User: true,
      },
    });
  }

  async postular(id: string, usuario: User, postularDto: PostularDto) {
    const miembro = await this.opportunityMembers.findFirst({
      where: {
        opportunityId: id,
        userId: usuario.id,
      },
    });

    if (miembro)
      throw new BadRequestException(
        'Usted ya tiene una postulación a esta oportunidad',
      );

    const oportunidad = await this.findOne(id);
    if (!oportunidad || oportunidad.isFinished)
      throw new BadRequestException(
        'Esta oportunidad no existe o ya no está disponible',
      );

    return this.opportunityMembers.create({
      data: {
        userId: usuario.id,
        description: postularDto.description,
        opportunityId: id,
      },
    });
  }

  findMembers(id: string) {
    return this.opportunityMembers.findMany({
      where: { opportunityId: id },
      include: { User: true },
    });
  }

  findMember(id: string, memberId: string) {
    return this.opportunityMembers.findFirst({
      where: { opportunityId: id, userId: memberId },
      include: { User: true },
    });
  }

  getCompanyOpportunities(id: string) {
    return this.opportunity.findMany({ where: { userId: id } });
  }

  getUserOpportunities(id: string) {
    return this.opportunityMembers.findMany({
      where: { userId: id },
      include: {
        Opportunity: true,
      },
    });
  }

  getUserOpportunitiesCompleted(id: string) {
    return this.opportunityMembers.findMany({
      where: { userId: id },
      include: {
        Opportunity: {
          where: {
            isFinished: true,
          },
        },
      },
    });
  }

  async closeOpportunity(user: User, id: string) {
    const oportunidad = await this.opportunity.findFirst({
      where: { id: id, userId: user.id },
    });

    if (!oportunidad) {
      throw new BadRequestException('Oportunidad no disponible');
    }

    if (oportunidad.isFinished) {
      throw new BadRequestException('Esta oportunidad ya ha finalizado');
    }

    const opportunityUpdated = await this.opportunity.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        isFinished: true,
      },
    });

    const usersRejected = await this.opportunityMembers.updateMany({
      where: {
        opportunityId: id,
      },
      data: {
        userStatus: 'rejected',
      },
    });

    return { opportunityUpdated, usersRejected };
  }

  async updateRequest(
    user: User,
    id: string,
    userId: string,
    { isApproved }: UpdateRequestDto,
  ) {
    const oportunidad = await this.opportunity.findUnique({
      where: {
        id: id,
        userId: user.id,
        isFinished: false,
      },
    });

    if (!oportunidad) {
      throw new NotFoundException(
        'Esta oportunidad no se encuentra disponible',
      );
    }

    await this.opportunityMembers.updateMany({
      where: {
        opportunityId: id,
        userId: userId,
      },
      data: {
        userStatus: isApproved ? 'accepted' : 'rejected',
      },
    });
    return { oportunidad };
  }

  getCategories() {
    return this.category.findMany({});
  }

 async startActivity(id: string): Promise<any> {
    const oportunidad = await this.opportunity.findUnique({
      where: { id },
    });
    if (!oportunidad) {
      throw new NotFoundException('Oportunidad no encontrada');
    }
    if (!oportunidad.isActive || oportunidad.isFinished) {
      throw new BadRequestException('La oportunidad no puede ser comenzada');
    }
    return this.opportunity.update({
      where: { id },
      data: { isActive: true, isFinished: false },
    });
  }

  async endActivity(id: string): Promise<any> {
    const oportunidad = await this.opportunity.findUnique({
      where: { id },
    });
    if (!oportunidad) {
      throw new NotFoundException('Oportunidad no encontrada');
    }
    if (!oportunidad.isActive || oportunidad.isFinished) {
      throw new BadRequestException('La oportunidad no puede ser terminada');
    }

    // * Puntos
    const  members = await this.opportunityMembers.findMany({
    where: {
      opportunityId: id,
      userStatus: 'accepted',
    },
  
    });
  
    const usersUpdated = await this.user.updateMany({
      where: { id: {in: members.map(({userId})=>userId)}},
      data: {
        //points: { increment: 10 }
        points: { increment: oportunidad.points }
      }
    });   

    return this.opportunity.update({
      where: { id },
      data: { isActive: false, isFinished: true },
    });
  }

  async deleteActivity(id: string, userId: string): Promise<any> {
    const oportunidad = await this.opportunity.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!oportunidad) {
      throw new NotFoundException('Oportunidad no encontrada');
    }
    if (oportunidad.userId !== userId) {
      throw new UnauthorizedException('No autorizado para eliminar esta oportunidad');
    }
    if (oportunidad.members.length > 0) {
      throw new BadRequestException('No es posible eliminar actividad con participantes');
    }
    return this.opportunity.delete({
      where: { id },
    });
  }

}
