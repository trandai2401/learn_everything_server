import { Test, TestingModule } from '@nestjs/testing';
import { ContestantSanswerController } from './contestant-sanswer.controller';
import { ContestantSanswerService } from './contestant-sanswer.service';

describe('ContestantSanswerController', () => {
  let controller: ContestantSanswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContestantSanswerController],
      providers: [ContestantSanswerService],
    }).compile();

    controller = module.get<ContestantSanswerController>(ContestantSanswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
