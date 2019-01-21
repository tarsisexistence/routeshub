import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BolidComponent } from './bolid.component';
import { VehiclesResolver } from '~app/core/routing/resolvers/vehicles.resolver';
import { bolidRoute } from '~app/core/routing/routes';

export const routes: Routes = [
  {
    path: bolidRoute.root.path,
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
