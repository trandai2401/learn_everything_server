import { Account } from 'src/modules/account/entities/account.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Course } from 'src/modules/course/entities/course.entity';
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

  @OneToMany(() => Cart, (cart) => cart.payment)
  carts: Cart[];

  @ManyToOne(() => Account, (account) => account.payments)
  account?: Account;
}
