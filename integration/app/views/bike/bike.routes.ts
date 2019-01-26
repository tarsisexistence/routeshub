import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikeComponent } from './bike.component';
import { VehiclesResolver } from '~app/routing/resolvers/vehicles.resolver';
import { bikeRoutes } from '~app/routing/notes';

/**
 * Declares routes on BikeModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: bikeRoutes.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
