export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
type TaskStatus = 'todo' | 'inProgress' | 'complete';

export interface Task {
  title: string;
  priority?: TaskPriority;
  status: TaskStatus;
  tags?: string[];
  createdAt: string;
}
