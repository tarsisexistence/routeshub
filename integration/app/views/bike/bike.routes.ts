import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BikeComponent } from './bike.component';
import { VehiclesResolver } from '~app/routing/resolvers/vehicles.resolver';
import { bikeRoute } from '~app/routing/routes';

/**
 * Declares routes on BikeModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes: Routes = [
  {
    path: bikeRoute.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
