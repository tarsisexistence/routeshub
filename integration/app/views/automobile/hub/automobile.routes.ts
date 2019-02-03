import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutomobileComponent } from '../container/automobile.component';
import { VehiclesResolver } from 'app/routing/resolvers/vehicles.resolver';
import { automobileNotes } from './automobile.note';

/**
 * Declares routes on AutomobileModule level
 */
export const routes = [
  {
    path: automobileNotes.root.path,
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
