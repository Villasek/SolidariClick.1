import { IsString } from 'class-validator';

export class PostularDto {
  @IsString()
  description: string;
}
