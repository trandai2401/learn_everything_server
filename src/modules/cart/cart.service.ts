import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { In, Not, Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { Course } from '../course/entities/course.entity';
import { ItemPayment } from '../item-payment/entities/item-payment.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(ItemPayment)
    private itemPaymentRepository: Repository<ItemPayment>,
  ) {}
  create(accountId, courseId) {
    const account = new Account();
    account.id = accountId;

    const course = new Course();
    course.id = courseId;

    const cart = new Cart();
    cart.account = account;
    cart.course = course;
    return this.cartRepository.save(cart);
  }

  findAll() {
    return `This action returns all cart`;
  }
  // Giaasy danh sacsh khaso hoc cua ban than
  async findOne(id: number): Promise<Cart[]> {
    const itemPayments = await this.itemPaymentRepository.find({
      where: {
        payment: {
          status: true,
        },
      },
      relations: {
        cart: true,
      },
    });
    const cartIds = itemPayments.map((item) => item.cart.courseId);

    return this.cartRepository.find({
      where: { account: { id: id }, courseId: Not(In(cartIds)) },
      relations: {
        course: { image: true, created_by: true },
      },
      select: {
        course: {
          created_by: { fullName: true },
          title: true,
          price: true,
        },
      },
    });
  }

  async update(id: number, userId, lecId) {
    return await this.cartRepository.update(
      { accountId: userId, courseId: id },
      { lectureBeingLearned: lecId },
    );
  }

  remove(accountId: number, courseId: number) {
    const cart: Cart = { accountId: accountId, courseId: courseId };
    return this.cartRepository.remove(cart);
  }

  payment = async (paymentId) => {
    // this.cartRepository.update(
    //   { bought: false, payment: paymentId },
    //   { bought: true },
    // );
  };

  getMyCourse = async (userId) => {
    const itemPayments = await this.itemPaymentRepository.find({
      where: {
        payment: {
          status: true,
        },
      },
      relations: {
        cart: true,
      },
    });
    const cartIds = itemPayments.map((item) => item.cart.courseId);

    const res = await this.cartRepository.find({
      where: {
        account: { id: userId },
        course: {
          id: In(cartIds),
        },
      },

      relations: {
        course: {
          image: true,
          created_by: { avatar: true },
        },
      },
      select: {
        course: {
          created_by: { fullName: true },
          title: true,
          price: true,
        },
      },
    });
    return res;
  };
}
