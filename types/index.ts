export type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'canceled';

export type IssuePriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Issue {
  id: string;
  identifier: string; // e.g., "ISS-123"
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  labels: Label[];
  assigneeId?: string;
  reporterId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IssueFilters {
  search: string;
  status: IssueStatus[];
  priority: IssuePriority[];
  assigneeId: string[];
  labelId: string[];
}
