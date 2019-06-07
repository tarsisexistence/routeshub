import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutomobileComponent } from '../container/automobile.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';

export const routes = [
  {
    path: '',
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobilesRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
