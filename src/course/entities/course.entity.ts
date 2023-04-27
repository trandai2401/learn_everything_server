import { Account } from 'src/account/entities/account.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Collection,
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

  @ManyToMany(() => Account, (account) => account.coursesTaught, {
    cascade: true,
    lazy: true,
  })
  @JoinTable()
  lecturer: Account[];

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
}
