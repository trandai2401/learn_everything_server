import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './enitites/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CartModule } from '../cart/cart.module';
import { ItemPayment } from '../item-payment/entities/item-payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    CartModule,
    TypeOrmModule.forFeature([ItemPayment]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
