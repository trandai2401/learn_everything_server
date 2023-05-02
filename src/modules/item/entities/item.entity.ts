import { ItemType } from 'src/modules/item-type/entities/item-type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  time?: number;

  @Column({ nullable: true })
  numericalOrder: number;

  @ManyToOne(() => ItemType, (itemType) => itemType.items, { nullable: true })
  typeItem: ItemType;
}
