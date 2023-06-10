import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { ContestantSanswer } from 'src/modules/contestant-sanswer/entities/contestant-sanswer.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Learned } from 'src/modules/learned/entities/learned.entity';
import { Payment } from 'src/modules/payment/enitites/payment.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { TestResult } from 'src/modules/test-result/entities/test-result.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: 0 })
  verify: boolean;

  @Column({ default: 0 })
  activity: boolean;

  @ManyToMany(() => Role, (role) => role.name, {
    cascade: true,
  })
  @JoinTable()
  roles: Role[];

  isAdmin?: boolean;

  // @ManyToMany(() => Course, (course) => course.lecturers)
  // coursesTaught: Course[];

  @OneToMany(() => Course, (course) => course.created_by)
  @JoinTable()
  ownedCourses: Course[];

  @OneToOne(() => Image)
  @JoinColumn()
  avatar: Image;

  @OneToMany(() => Cart, (cart) => cart.account)
  carts: Cart[];

  // @OneToMany(() => Payment, (payment) => payment.account)
  // payments?: Payment[];

  @OneToMany(() => Comment, (comment) => comment.account)
  comments: Comment[];

  @OneToOne(() => Learned, (learned) => learned.account) // specify inverse side as a second parameter
  learned: Learned;

  @OneToMany(() => TestResult, (testResult) => testResult.account)
  testResults: TestResult[];
}
