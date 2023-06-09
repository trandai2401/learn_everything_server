import { Account } from 'src/modules/account/entities/account.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { ItemPayment } from 'src/modules/item-payment/entities/item-payment.entity';
import { Payment } from 'src/modules/payment/enitites/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['account', 'course'])
export class Cart {
  @PrimaryColumn({ nullable: false })
  accountId: number;

  @PrimaryColumn({ nullable: false })
  courseId: number;

  @ManyToOne(() => Account, (account) => account.carts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId' })
  account?: Account;

  @ManyToOne(() => Course, (course) => course.carts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course?: Course;

  @OneToMany(() => ItemPayment, (itemPayment) => itemPayment.cart)
  itemPayments?: ItemPayment[];
  // @ManyToOne(() => , (payment) => payment.carts, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // payment?: Payment;

  @Column({ nullable: true })
  lectureBeingLearned?: number;
}
