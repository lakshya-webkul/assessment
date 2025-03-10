import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GadgetsComponent } from './gadgets/gadgets.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'gadgets',
    component: GadgetsComponent,
    canActivate: [authGuard],
  }
];
