import { Test, TestingModule } from '@nestjs/testing';
import { LearnedService } from './learned.service';

describe('LearnedService', () => {
  let service: LearnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnedService],
    }).compile();

    service = module.get<LearnedService>(LearnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
