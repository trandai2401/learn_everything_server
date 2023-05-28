import { Injectable } from '@nestjs/common';
import { Payment } from './enitites/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/entities/cart.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private readonly cartService: CartService,
  ) {}
  public create = async (userId: number) => {
    const user = { id: userId };
    const carts: Cart[] = await this.cartService.findOne(userId);
    const total = carts.reduce((pre, cart) => {
      return cart.course.price + pre;
    }, 0);

    const payment = {
      account: user,
      total: total,
      carts: carts.map((cart) => ({
        accountId: cart.accountId,
        courseId: cart.courseId,
      })),
    };
    return this.paymentRepository.save(payment);
  };

  public payment = async (paymentId) => {
    this.cartService.payment(paymentId);
  };
}
