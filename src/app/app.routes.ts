import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'app',
    loadChildren: () => import('./features/tasks/tasks.routes').then(m => m.tasksRoutes),
  }
];
