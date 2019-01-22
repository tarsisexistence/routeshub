import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutomobileComponent } from './automobile.component';
import { VehiclesResolver } from '~app/core/routing/resolvers/vehicles.resolver';
import { automobileRoute } from '~app/core/routing/routes';

/**
 * Declares routes on AutomobileModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes: Routes = [
  {
    path: automobileRoute.root.path,
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
