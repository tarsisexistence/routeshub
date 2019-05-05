import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BolidComponent } from '../container/bolid.component';
import { VehiclesResolver } from 'app/routing/resolvers/vehicles.resolver';
import { bolidNotes } from './bolid.notes';

/**
 * Declares routes on BolidModule level
 */
export const routes = [
  {
    path: bolidNotes.root.path,
    component: BolidComponent,
    pathMatch: 'full',
    resolve: { vehicles: VehiclesResolver }
  },
  {
    path: bolidNotes.year.path,
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
