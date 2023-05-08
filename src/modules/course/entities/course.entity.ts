import { EntityBase } from 'src/Entity/EntityBase';
import { Account } from 'src/modules/account/entities/account.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Section } from 'src/modules/section/entities/section.entity';
import { SubCategory } from 'src/modules/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 2000 })
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

  // @ManyToMany(() => SubCategory, {
  //   cascade: true,
  // })
  // @JoinTable()
  // subCategories: SubCategory[];
  @ManyToMany(() => SubCategory, (sub) => sub.courses, { cascade: true })
  @JoinTable()
  subCategories: SubCategory[];

  @ManyToMany(() => Account, {
    cascade: true,
  })
  @JoinTable()
  lecturers: Account[];

  @OneToOne(() => Image, { nullable: true, cascade: true })
  @JoinColumn()
  image: Image;

  @OneToMany(() => Section, (section) => section.course, { cascade: true })
  sections: Section[];

  @Column({ default: 0 })
  loves: number;
}
