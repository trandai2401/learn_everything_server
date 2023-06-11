import { Account } from 'src/modules/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class TeacherInfermation {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Account, (account) => account.teacherInformation)
  @JoinColumn()
  account: Account;

  @Column({ type: 'varchar', length: 18 })
  bankAccount: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ default: 0 })
  money: number;
}
