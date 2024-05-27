import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService extends PrismaClient {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async createUser(infoUsuario: CreateUserDto) {
    try {
      const password = await bcrypt.hash(infoUsuario.password, 11);
      const isCompany = infoUsuario.address?.length > 0;

      const usuario = await this.user.create({
        data: {
          email: infoUsuario.email,
          rut: infoUsuario.rut,
          name: infoUsuario.name,
          password: password,
          address: infoUsuario.address,
          isCompany: isCompany,
          roles: isCompany ? 'empresa' : 'usuario',
        },
      });

      return {
        usuario: usuario,
        token: this.jwtService.sign({ id: usuario.id }),
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Este usuario ya existe');
      }
      console.error(error);
      throw new BadRequestException(
        'Error al registrar usuario, intente nuevamente',
      );
    }
  }

  async loginUser(infoUsuario: LoginUserDto) {
    const usuario = await this.user.findUnique({
      where: { email: infoUsuario.email },
    });

    if(!usuario) {
      throw new BadRequestException('Este usuario no existe');
    }
    const isCorrectPassword = await bcrypt.compare(
      infoUsuario.password,
      usuario.password,
    );

    if (isCorrectPassword === false) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      usuario: usuario,
      token: this.jwtService.sign({ id: usuario.id }),
    };
  }
}
