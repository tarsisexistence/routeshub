import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BolidComponent } from './bolid.component';
import { VehiclesResolver } from '../../routing/resolvers/vehicles.resolver';
import { bolidRoute } from '../../routing/routes';

export const routes: Routes = [
  {
    path: bolidRoute.root.path,
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
