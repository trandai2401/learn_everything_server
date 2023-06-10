import { type } from 'os';
import { ContestantSanswer } from 'src/modules/contestant-sanswer/entities/contestant-sanswer.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 500 })
  question: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  a: string;
  @Column({ type: 'varchar', length: 500, nullable: true })
  b: string;
  @Column({ type: 'varchar', length: 500, nullable: true })
  c: string;
  @Column({ type: 'varchar', length: 500, nullable: true })
  d: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  correctAnswer: string;

  @ManyToOne(() => Item, (item) => item.questions)
  item: Item;

  @OneToMany(
    () => ContestantSanswer,
    (contestantSanswer) => contestantSanswer.question,
  )
  contestantSAnswers: ContestantSanswer[];
}
