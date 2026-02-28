import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mentor_id' })
  mentorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'mentor_id' })
  mentor: User;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Index('IDX_group_invite_code')
  @Column({ name: 'invite_code', unique: true })
  inviteCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
