import { IsString, MaxLength } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @MaxLength(200)
  comment: string;
}
