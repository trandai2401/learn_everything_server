import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: 0 })
  verify: boolean;

  @Column({ default: 0 })
  activity: boolean;

  @ManyToMany(() => Role, (role) => role.name, {
    cascade: true,
    lazy: true,
  })
  @JoinTable()
  roles: Role[];
}
