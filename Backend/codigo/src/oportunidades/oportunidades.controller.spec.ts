import { Test, TestingModule } from '@nestjs/testing';
import { OportunidadesController } from './oportunidades.controller';
import { OportunidadesService } from './oportunidades.service';

describe('OportunidadesController', () => {
  let controller: OportunidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OportunidadesController],
      providers: [OportunidadesService],
    }).compile();

    controller = module.get<OportunidadesController>(OportunidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
