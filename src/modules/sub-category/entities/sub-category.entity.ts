import { Category } from 'src/modules/category/entities/category.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Course, (course) => course.subCategory)
  courese: Course[];
}
