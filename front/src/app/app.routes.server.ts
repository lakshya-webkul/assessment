import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes = [
  {
    path: '',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    renderMode: RenderMode.Server,
  },
  {
    path: 'gadgets',
    loadComponent: () => import('./gadgets/gadgets.component').then(m => m.GadgetsComponent),
    renderMode: RenderMode.Server,
  }
];
