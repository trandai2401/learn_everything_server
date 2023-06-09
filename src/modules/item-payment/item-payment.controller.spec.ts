import { Test, TestingModule } from '@nestjs/testing';
import { ItemPaymentController } from './item-payment.controller';
import { ItemPaymentService } from './item-payment.service';

describe('ItemPaymentController', () => {
  let controller: ItemPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPaymentController],
      providers: [ItemPaymentService],
    }).compile();

    controller = module.get<ItemPaymentController>(ItemPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
