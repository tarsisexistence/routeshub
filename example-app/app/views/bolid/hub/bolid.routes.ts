import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature, Slice } from 'lib';
import { BolidComponent } from '../container/bolid.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { appSlice } from '../../../routing/hub/app.routes';
import { BOLID_HUB_KEY, BolidNotes } from './bolid.hub';

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

export const bolidSlice: Slice<BolidNotes> = createFeature<BolidNotes>(
  appSlice.bolids,
  routes,
  BOLID_HUB_KEY
);
