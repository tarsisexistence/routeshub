import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeComponent } from './containers/bike/bike.component';

export const routes: Routes = [
  {
    path: '',
    component: BikeComponent
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
