import { Account } from 'src/modules/account/entities/account.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { Lecture } from 'src/modules/lecture/entities/lecture.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['account', 'item'])
export class Learned {
  @PrimaryColumn({ nullable: false })
  accountId: number;

  @PrimaryColumn({ nullable: false })
  itemId: number;
  ///
  @OneToOne(() => Account, (account) => account.carts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @OneToOne(() => Item, (item) => item.learned, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'itemId' })
  item: Item;
}
