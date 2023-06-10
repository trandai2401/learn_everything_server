import { Question } from 'src/modules/question/entities/question.entity';
import { TestResult } from 'src/modules/test-result/entities/test-result.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['testResult', 'question'])
export class ContestantSanswer {
  @PrimaryColumn({ nullable: false })
  testResultId: number;

  @PrimaryColumn({ nullable: false })
  questionId: number;

  @ManyToOne(() => TestResult, (testResult) => testResult.contestantSAnswers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'testResultId' })
  testResult: TestResult;

  @ManyToOne(() => Question, (question) => question.contestantSAnswers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column({ type: 'varchar', length: 2, nullable: true })
  answer: string;
}
// @Entity()
// @Unique(['account', 'item'])
// export class Learned {
//   @PrimaryColumn({ nullable: false })
//   accountId: number;

//   @PrimaryColumn({ nullable: false })
//   itemId: number;
//   ///
//   @OneToOne(() => Account, (account) => account.carts, {
//     cascade: true,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'accountId' })
//   account: Account;

//   @OneToOne(() => Item, (item) => item.learned, {
//     cascade: true,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'itemId' })
//   item: Item;
// }
