import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BikeComponent } from './bike.component';
import { VehiclesResolver } from '../../routing/resolvers/vehicles.resolver';
import { bikeRoute } from '../../routing/routes';

export const routes: Routes = [
  {
    path: bikeRoute.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
