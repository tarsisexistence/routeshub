import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutomobileComponent } from './automobile.component';
import { VehiclesResolver } from '../../routing/vehicles.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
