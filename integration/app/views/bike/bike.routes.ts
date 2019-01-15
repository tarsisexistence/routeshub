import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BikeComponent } from './bike.component';
import { VehiclesResolver } from '../../routes/resolvers/vehicles.resolver';
import { bikeBranch } from '../../routes/branches';

export const routes: Routes = [
  {
    path: bikeBranch.root.path,
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);
