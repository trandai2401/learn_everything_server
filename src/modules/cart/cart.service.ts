import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
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

  findOne(id: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { account: { id: id }, bought: false },
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

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(accountId: number, courseId: number) {
    const cart: Cart = { accountId: accountId, courseId: courseId };
    return this.cartRepository.remove(cart);
  }

  payment = async (paymentId) => {
    this.cartRepository.update(
      { bought: false, payment: paymentId },
      { bought: true },
    );
  };

  getMyCourse = async (userId) => {
    return this.cartRepository.find({
      where: { account: { id: userId }, bought: true },
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
  };
}
