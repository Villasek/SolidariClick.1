import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  rut: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  password: string;
}
