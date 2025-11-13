import { IssueStatus, IssuePriority } from '@/types';
import {
  Circle,
  CircleDashed,
  CircleDot,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle
} from 'lucide-react';

export const STATUS_CONFIG: Record<IssueStatus, {
  label: string;
  color: string;
  bgColor: string;
  icon: any;
}> = {
  backlog: {
    label: 'Backlog',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    icon: CircleDashed,
  },
  todo: {
    label: 'To Do',
    color: 'text-gray-700',
    bgColor: 'bg-gray-200 dark:bg-gray-700',
    icon: Circle,
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: CircleDot,
  },
  in_review: {
    label: 'In Review',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: AlertCircle,
  },
  done: {
    label: 'Done',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: CheckCircle2,
  },
  canceled: {
    label: 'Canceled',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    icon: XCircle,
  },
};

export const PRIORITY_CONFIG: Record<IssuePriority, {
  label: string;
  color: string;
  icon: any;
}> = {
  none: {
    label: 'None',
    color: 'text-gray-400',
    icon: Minus,
  },
  low: {
    label: 'Low',
    color: 'text-blue-500',
    icon: ArrowDown,
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-500',
    icon: Minus,
  },
  high: {
    label: 'High',
    color: 'text-orange-500',
    icon: ArrowUp,
  },
  urgent: {
    label: 'Urgent',
    color: 'text-red-500',
    icon: AlertTriangle,
  },
};

export const STATUSES: IssueStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled'];
export const PRIORITIES: IssuePriority[] = ['none', 'low', 'medium', 'high', 'urgent'];
