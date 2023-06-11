import { Account } from 'src/modules/account/entities/account.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { ItemPayment } from 'src/modules/item-payment/entities/item-payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  total: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  date?: Date;

  @Column({ default: false })
  status: boolean;

  @OneToMany(() => ItemPayment, (itemPayment) => itemPayment.payment)
  itemPayments: ItemPayment[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public dateOfPayment: Date;
  // @OneToMany(() => Cart, (cart) => cart.payment)
  // carts: Cart[];

  // @ManyToOne(() => Account, (account) => account.payments)
  // account?: Account;
}
