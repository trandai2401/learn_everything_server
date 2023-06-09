import { Test, TestingModule } from '@nestjs/testing';
import { ItemPaymentService } from './item-payment.service';

describe('ItemPaymentService', () => {
  let service: ItemPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPaymentService],
    }).compile();

    service = module.get<ItemPaymentService>(ItemPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
