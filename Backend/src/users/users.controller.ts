import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './auth.decorator';
import { User } from './user.decorator';
import { type User as TUser } from '@prisma/client';
import { InteresesDto } from './dto/intereses.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registrar')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('iniciar_sesion')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Get('perfil')
  @Auth()
  perfil(@User() user: TUser) {
    return this.usersService.perfil(user.id);
  }

  @Put('actualizar-intereses')
  @Auth()
  actualizarIntereses(@User() user: TUser, @Body() data: InteresesDto) {
    return this.usersService.updateIntereses(user.id, data);
  }

  @Put('actualizar-perfil')
  @Auth()
  actualizarPerfil(@User() user: TUser, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(user.id, updateUserDto);
  }
}
