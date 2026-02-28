import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Submission } from '../../submissions/entities/submission.entity';
import { User } from '../../users/entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'submission_id' })
  @Index('IDX_comment_submission')
  submissionId: string;

  @ManyToOne(() => Submission)
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @Column({ name: 'author_id' })
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ name: 'line_number', type: 'int', nullable: true })
  lineNumber: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'code_snippet', type: 'text', nullable: true })
  codeSnippet: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
