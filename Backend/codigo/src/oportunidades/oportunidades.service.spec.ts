import { Test, TestingModule } from '@nestjs/testing';
import { OportunidadesService } from './oportunidades.service';

describe('OportunidadesService', () => {
  let service: OportunidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OportunidadesService],
    }).compile();

    service = module.get<OportunidadesService>(OportunidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
