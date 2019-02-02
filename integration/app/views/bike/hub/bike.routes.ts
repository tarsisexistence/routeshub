import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikeComponent } from '../container/bike.component';
import { VehiclesResolver } from 'app/routing/resolvers/vehicles.resolver';
import { bikeNotes } from '~app/views/bike/hub/bike.note';

/**
 * Declares routes on BikeModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: bikeNotes.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
