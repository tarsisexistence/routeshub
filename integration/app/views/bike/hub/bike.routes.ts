import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BikeComponent } from '../container/bike.component';
import { VehiclesResolver } from 'app/routing/resolvers/vehicles.resolver';
import { bikeNotes } from './bike.notes';

/**
 * Declares routes on BikeModule level
 */
export const routes = [
  {
    path: bikeNotes.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
