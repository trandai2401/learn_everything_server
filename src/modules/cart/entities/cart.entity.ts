import { Account } from 'src/modules/account/entities/account.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['account', 'course'])
export class Cart {
  @PrimaryColumn()
  accountId: number;

  @PrimaryColumn()
  courseId: number;

  @ManyToOne(() => Account, (account) => account.carts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId' })
  account?: Account;

  @ManyToOne(() => Course, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course?: Course;
}
