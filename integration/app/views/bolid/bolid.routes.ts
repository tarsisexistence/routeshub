import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BolidComponent } from './bolid.component';
import { VehiclesResolver } from '../../routing/resolvers/vehicles.resolver';
import { bolidBranch } from '../../routing/branches';

export const routes: Routes = [
  {
    path: bolidBranch.root.path,
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
