import { IsArray, IsInt } from 'class-validator';

export class InteresesDto {
  @IsArray()
  @IsInt({ each: true })
  intereses: number[];
}
