import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BolidComponent } from '../container/bolid.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';

export const routes = [
  {
    path: '',
    component: BolidComponent,
    pathMatch: 'full',
    resolve: { vehicles: VehiclesResolver }
  },
  {
    path: ':year',
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
