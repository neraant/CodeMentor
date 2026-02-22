export type UserRole = "student" | "mentor";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
}

export type SubmissionStatus =
  | "pending"
  | "in_review"
  | "changes_requested"
  | "approved";

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  code: string;
  file_name: string;
  version: number;
  status: SubmissionStatus;
  language: string;
  created_at: string;
}

export interface Comment {
  id: string;
  submission_id: string;
  author_id: string;
  line_number: number | null;
  content: string;
  code_snippet?: string;
  created_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  language: string;
  deadline: string;
  group_id: string;
  mentor_id: string;
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  mentor_id: string;
  invite_code: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: "new_comment" | "status_changed" | "new_submission";
  payload: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}
