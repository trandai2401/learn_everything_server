import { Course } from 'src/modules/course/entities/course.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Course, (course) => course.sections)
  course?: Course;

  @OneToMany(() => Item, (item) => item.section)
  items?: Item[];
}
