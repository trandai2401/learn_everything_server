import { Module } from '@nestjs/common';
import { ItemPaymentService } from './item-payment.service';
import { ItemPaymentController } from './item-payment.controller';
import { ItemPayment } from './entities/item-payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPayment])],

  controllers: [ItemPaymentController],
  providers: [ItemPaymentService],
})
export class ItemPaymentModule {}
