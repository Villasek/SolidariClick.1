import { IsOptional, IsString, IsNumber  } from 'class-validator';

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

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  profilePicture?: any;
}

