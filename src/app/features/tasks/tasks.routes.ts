import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks-page/tasks-page').then(m => m.TasksPageComponent),
  }
] as const;
