import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BolidComponent } from './bolid.component';
import { VehiclesResolver } from '../../routing/vehicles.resolver';

export const routes: Routes = [
  {
    path: '',
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
