import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task, TaskBoard, TaskPriority, TaskStatus } from '@features/tasks/model/tasks.models';

interface TaskResponse {
  id: string;
  title: string;
  priority: TaskPriority;
  tags: string[];
  status: TaskStatus;
  created_at: string;
}

interface BoardsTasksResponse {
  todo: TaskResponse[];
  in_progress: TaskResponse[];
  complete: TaskResponse[];
}

@Injectable({providedIn: 'root'})
export class TasksService {
  private readonly http = inject(HttpClient);

  public getAll(): Observable<TaskBoard> {
    return this.http.get<BoardsTasksResponse>('/tasks/board/columns').pipe(map((response) => ({
      todo: this.mapTasks(response.todo),
      inProgress: this.mapTasks(response.in_progress),
      complete: this.mapTasks(response.complete),
    })));
  }

  private mapTasks(list: TaskResponse[]): Task[] {
    return list.map(task => ({
      id: task.id,
      title: task.title,
      priority: task.priority,
      tags: task.tags,
      status: task.status,
      createdAt: new Date(task.created_at),
    }))
  }
}
