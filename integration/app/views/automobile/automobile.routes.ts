import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutomobileComponent } from './automobile.component';
import { VehiclesResolver } from '../../routes/resolvers/vehicles.resolver';
import { automobileBranch } from '../../routes/branches';

export const routes: Routes = [
  {
    path: automobileBranch.root.path,
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
