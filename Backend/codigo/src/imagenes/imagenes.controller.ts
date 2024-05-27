import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { Response } from 'express';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Get(':img')
  findOne(@Param('img') img: string, @Res() res: Response) {
    return res.sendFile(this.imagenesService.findOne(img));
  }
}
