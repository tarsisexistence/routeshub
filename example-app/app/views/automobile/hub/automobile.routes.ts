import { createFeature } from 'lib';
import { AutomobileComponent } from '../container/automobile.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { AUTOMOBILE_HUB_KEY, AutomobileNotes } from './automobile.notes';

export const automobileRoutes = [
  {
    path: '',
    component: AutomobileComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const automobileSlice = createFeature<AutomobileNotes>(
  automobileRoutes,
  AUTOMOBILE_HUB_KEY
);
