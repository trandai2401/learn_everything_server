import { Account } from 'src/modules/account/entities/account.entity';
import { ContestantSanswer } from 'src/modules/contestant-sanswer/entities/contestant-sanswer.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  time?: Date;

  @ManyToOne(() => Account, (account) => account.testResults)
  account: Account;

  @ManyToOne(() => Item, (item) => item.testResults)
  item: Item;

  @OneToMany(
    () => ContestantSanswer,
    (contestantSanswer) => contestantSanswer.testResult,
  )
  contestantSAnswers: ContestantSanswer[];
}
