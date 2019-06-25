import { createFeature } from 'lib';
import { BikeComponent } from '../container/bike.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { BIKE_HUB_KEY, BikeNotes } from './bike.notes';

export const bikeRoutes = [
  {
    path: '',
    component: BikeComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bikeSlice = createFeature<BikeNotes>(bikeRoutes, BIKE_HUB_KEY);
