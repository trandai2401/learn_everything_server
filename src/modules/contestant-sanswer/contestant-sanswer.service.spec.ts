import { Test, TestingModule } from '@nestjs/testing';
import { ContestantSanswerService } from './contestant-sanswer.service';

describe('ContestantSanswerService', () => {
  let service: ContestantSanswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestantSanswerService],
    }).compile();

    service = module.get<ContestantSanswerService>(ContestantSanswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
