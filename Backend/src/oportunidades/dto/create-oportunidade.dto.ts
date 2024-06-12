import { IsNumber, IsString } from 'class-validator';

export class CreateOportunidadeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  date: string;

  @IsString()
  location: string;

  @IsString()
  categoryId: string;

  
  @IsString()
  points: string;
}
