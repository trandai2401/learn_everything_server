import { DemoEntity } from 'src/Entity/DemoEnity';
import { Item } from 'src/modules/item/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  video: string;

  @OneToOne(() => Item)
  @JoinColumn()
  item: Item;
}
