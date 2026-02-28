import {
  Assignment,
  ProgrammingLanguage,
} from '../../assignments/entities/assignment.entity';
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

export enum SubmissionStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  CHANGES_REQUESTED = 'changes_requested',
  APPROVED = 'approved',
}

@Entity('submissions')
@Index(['assignmentId', 'studentId'])
@Index(['assignmentId', 'studentId', 'version'], { unique: true })
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'assignment_id' })
  assignmentId: string;

  @ManyToOne(() => Assignment)
  @JoinColumn({ name: 'assignment_id' })
  assignment: Assignment;

  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column({ type: 'text' })
  code: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_path' })
  filePath: string;

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'enum', enum: ProgrammingLanguage })
  language: ProgrammingLanguage;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
