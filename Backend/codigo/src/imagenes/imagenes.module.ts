import { Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';

@Module({
  controllers: [ImagenesController],
  providers: [ImagenesService],
})
export class ImagenesModule {}
