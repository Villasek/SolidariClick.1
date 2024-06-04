import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOportunidadeDto } from './dto/create-oportunidade.dto';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { type User } from '@prisma/client';
import { PostularDto } from './dto/postular.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class OportunidadesService extends PrismaClient {
  create(
    createOportunidadeDto: CreateOportunidadeDto,
    file: Express.Multer.File,
    usuario: User,
  ) {
    const idOportunidad = uuid();
    const imagen = `${idOportunidad}.${file.originalname.split('.').at(-1)}`;

    const oportunidad = this.opportunity.create({
      data: {
        ...createOportunidadeDto,
        image: imagen,
        userId: usuario.id,
      },
    });
    fs.writeFileSync(
      path.join(__dirname, `../../images/${imagen}`),
      file.buffer,
    );

    return oportunidad;
  }

  findAll() {
    return this.opportunity.findMany({
      include: {
        User: true, // Incluye el usuario que creó la oportunidad
      },
    });
  }

  findOne(id: string) {
    return this.opportunity.findFirst({
      where: { id, isActive: true },
      include: {
        User: true, // Incluye el usuario que creó la oportunidad
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
        Opportunity: true, // Asegúrate de incluir la relación con la tabla de oportunidades
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
}
