import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagenesService {
  findOne(img: string) {
    const imagen = path.join(__dirname, `../../../images/${img}`);
    if (!fs.existsSync(imagen)) {
      throw new NotFoundException(`No hay resultados para: ${img}`);
    }

    return imagen;
  }
}
