import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikeComponent } from './bike.component';
import { VehiclesResolver } from '~app/routing/resolvers/vehicles.resolver';
import { bikeRoute } from '~app/routing/describes';

/**
 * Declares routes on BikeModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: bikeRoute.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
