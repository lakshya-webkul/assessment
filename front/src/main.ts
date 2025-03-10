import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { GadgetsComponent } from './app/gadgets/gadgets.component';
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gadgets', component: GadgetsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom()],
}).catch(err => console.error(err));
