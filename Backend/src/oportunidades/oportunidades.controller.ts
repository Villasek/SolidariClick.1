import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { OportunidadesService } from './oportunidades.service';
import { CreateOportunidadeDto } from './dto/create-oportunidade.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '../users/auth.decorator';
import { User } from 'src/users/user.decorator';
import { type User as TUser } from '@prisma/client';
import { PostularDto } from './dto/postular.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('oportunidades')
export class OportunidadesController {
  constructor(private readonly oportunidadesService: OportunidadesService) {}

  @Post()
  @Auth('empresa')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createOportunidadeDto: CreateOportunidadeDto,
    @UploadedFile(new ParseFilePipe({}))
    file: Express.Multer.File,
    @User() usuario: TUser,
  ) {
    try {
      return await this.oportunidadesService.create(
        createOportunidadeDto,
        file,
        usuario,
      );
    } catch (error) {
      throw new BadRequestException(error.message || 'Error creating opportunity');
    }
  }

  @Get('/oportunidades-empresa')
  @Auth('empresa')
  findCompanyOpportunities(@User() usuario: TUser) {
    return this.oportunidadesService.getCompanyOpportunities(usuario.id);
  }

  @Get('categorias')
  findCategories() {
    return this.oportunidadesService.getCategories();
  }

  @Get('/mis-oportunidades-inscritas')
  @Auth()
  findMyOpportunities(@User() usuario: TUser) {
    return this.oportunidadesService.getUserOpportunities(usuario.id);
  }

  @Get('/mis-oportunidades-completadas')
  @Auth()
  findCompletedOpportunities(@User() usuario: TUser) {
    return this.oportunidadesService.getUserOpportunitiesCompleted(usuario.id);
  }

  @Get('/solicitudes-empresa')
  @Auth('empresa')
  findRequestsForCompany(@User() usuario: TUser) {
    return this.oportunidadesService.findRequestsForCompany(usuario.id);
  }

  @Get('/filtrar-categoria/:categoria')
  findByCategory(@Param('categoria') categoria: string) {
    const categoryId = parseInt(categoria, 10);
    if (isNaN(categoryId)) {
      throw new BadRequestException('Invalid category ID');
    }
    return this.oportunidadesService.findByCategory(categoryId);
  }

  @Get()
  findAll() {
    return this.oportunidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oportunidadesService.findOne(id);
  }

  @Post('/postular/:id')
  @Auth('usuario', 'empresa')
  postular(
    @Param('id') id: string,
    @User() usuario: TUser,
    @Body() postularDto: PostularDto,
  ) {
    return this.oportunidadesService.postular(id, usuario, postularDto);
  }

  @Get('/miembros/:oportunidad')
  findMembers(@Param('oportunidad') oportunidad: string) {
    return this.oportunidadesService.findMembers(oportunidad);
  }

  @Get('/miembros/:oportunidad/:miembro')
  findMember(@Param('oportunidad') oportunidad: string, miembro: string) {
    return this.oportunidadesService.findMember(oportunidad, miembro);
  }

  @Patch('/cerrar/:id')
  @Auth('empresa')
  closeOpportunity(@User() usuario: TUser, @Param('id') id: string) {
    return this.oportunidadesService.closeOpportunity(usuario, id);
  }

  @Patch('/actualizar-solicitud/:id/:user')
  @Auth('empresa')
  updateRequest(
    @User() usuario: TUser,
    @Param('id') id: string,
    @Param('user') user: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return this.oportunidadesService.updateRequest(
      usuario,
      id,
      user,
      updateRequestDto,
    );
  }
}
