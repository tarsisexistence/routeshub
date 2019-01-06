import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomobileComponent } from './containers/automobile/automobile.component';

export const routes: Routes = [
  {
    path: '',
    component: AutomobileComponent
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
