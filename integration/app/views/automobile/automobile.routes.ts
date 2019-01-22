import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutomobileComponent } from './automobile.component';
import { VehiclesResolver } from '~app/routing/resolvers/vehicles.resolver';
import { automobileRoute } from '~app/routing/routes';

/**
 * Declares routes on AutomobileModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: automobileRoute.root.path,
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
