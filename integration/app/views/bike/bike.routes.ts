import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BikeComponent } from './bike.component';
import { VehiclesResolver } from '../../routing/vehicles.resolver';

export const routes: Routes = [
  {
    path: '',
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
