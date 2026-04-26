export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'todo' | 'inProgress' | 'complete';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  tags: string[];
  createdAt: Date;
}

export interface TaskDetails extends Task {
  description: string;
}

export interface TaskBoard {
  todo: Task[];
  inProgress: Task[];
  complete: Task[];
}
