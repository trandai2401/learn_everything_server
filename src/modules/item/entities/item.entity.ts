import { DemoEntity } from 'src/Entity/DemoEnity';
import { ItemType } from 'src/modules/item-type/entities/item-type.entity';
import { Learned } from 'src/modules/learned/entities/learned.entity';
import { Lecture } from 'src/modules/lecture/entities/lecture.entity';
import { Section } from 'src/modules/section/entities/section.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  time?: number;

  @Column({ nullable: true })
  numericalOrder: number;

  @ManyToOne(() => ItemType, (itemType) => itemType.items, { nullable: true })
  typeItem: ItemType;

  @ManyToOne(() => Section, (section) => section.items)
  section: Section;

  @OneToOne(() => Lecture, (lecture) => lecture.item, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  lecture: Lecture;

  @OneToOne(() => Learned, (learned) => learned.item) // specify inverse side as a second parameter
  learned: Learned;
}
