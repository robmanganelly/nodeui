import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
