import { Course } from 'src/modules/course/entities/course.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  isAdmin?: boolean;

  // @ManyToMany(() => Course, (course) => course.lecturers)
  // coursesTaught: Course[];

  @OneToMany(() => Course, (course) => course.created_by)
  @JoinTable()
  ownedCourses: Course[];
}
