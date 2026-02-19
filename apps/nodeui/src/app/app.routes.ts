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
  },{
    path: 'nodes',
    loadComponent: () => import('./pages/nodes').then((m) => m.AllFeaturesDemoComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
