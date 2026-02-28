import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { User } from '../../users/entities/user.entity';
import { ProgrammingLanguage } from '@/common/types/assignment.type';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_assignment_group')
  @Column({ name: 'group_id' })
  groupId: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ name: 'mentor_id' })
  mentorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'mentor_id' })
  mentor: User;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ProgrammingLanguage })
  language: ProgrammingLanguage;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
