import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { User } from '../../users/entities/user.entity';

@Entity('group_members')
@Index(['groupId', 'studentId'], { unique: true })
export class GroupMember {
  @PrimaryColumn({ name: 'group_id' })
  groupId: string;

  @PrimaryColumn({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
