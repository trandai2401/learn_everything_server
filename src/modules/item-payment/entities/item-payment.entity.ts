import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Payment } from 'src/modules/payment/enitites/payment.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.itemPayments)
  cart: Cart;

  @Column()
  price: number;

  @ManyToOne(() => Payment, (payment) => payment.itemPayments)
  payment: Payment;
}
