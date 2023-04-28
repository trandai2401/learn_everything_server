import { Account } from 'src/modules/account/entities/account.entity';
import { SubCategory } from 'src/modules/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  ratingPoint: number;

  @Column({ default: 0 })
  ratingNumber: number;

  @Column({ default: false })
  public: boolean;

  @ManyToOne(() => Account, (account) => account.ownedCourses)
  created_by: Account;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.courese)
  subCategory: SubCategory;

  @ManyToMany(() => Account, {
    cascade: true,
  })
  @JoinTable()
  lecturers: Array<Account>;
}
