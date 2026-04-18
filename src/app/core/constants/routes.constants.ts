export const APP_ROUTES = {
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
  app: {
    root: '/app/tasks',
  }
} as const;
