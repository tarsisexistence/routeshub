import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikeComponent } from '../container/bike.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';

export const routes = [
  {
    path: '',
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
