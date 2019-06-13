import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature, Slice } from 'lib';
import { AutomobileComponent } from '../container/automobile.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { appSlice } from '../../../routing/hub/app.routes';
import { AUTOMOBILE_HUB_KEY, AutomobileNotes } from './automobile.notes';

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

export const automobileSlice: Slice<AutomobileNotes> = createFeature<
  AutomobileNotes
>(appSlice.automobiles, routes, AUTOMOBILE_HUB_KEY);
