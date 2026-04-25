import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/components/app-layout/app-layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.tasksRoutes),
  },
];
