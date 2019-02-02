import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BolidComponent } from '../container/bolid.component';
import { VehiclesResolver } from 'app/routing/resolvers/vehicles.resolver';
import { bolidNotes } from './bolid.note';

/**
 * Declares routes on BolidModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: bolidNotes.root.path,
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
