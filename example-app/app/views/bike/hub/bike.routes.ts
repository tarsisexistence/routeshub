import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature, Slice } from 'lib';
import { BikeComponent } from '../container/bike.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { appSlice } from '../../../routing/hub/app.routes';
import { BIKE_HUB_KEY, BikeNotes } from './bike.hub';

export const routes = [
  {
    path: '',
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeRouting: ModuleWithProviders = RouterModule.forChild(routes);

export const bikeSlice: Slice<BikeNotes> = createFeature<BikeNotes>(
  appSlice.bikes,
  routes,
  BIKE_HUB_KEY
);
