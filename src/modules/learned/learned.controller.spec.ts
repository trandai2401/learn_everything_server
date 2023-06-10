import { Test, TestingModule } from '@nestjs/testing';
import { LearnedController } from './learned.controller';
import { LearnedService } from './learned.service';

describe('LearnedController', () => {
  let controller: LearnedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnedController],
      providers: [LearnedService],
    }).compile();

    controller = module.get<LearnedController>(LearnedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
