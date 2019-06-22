import { BolidComponent } from '../container/bolid.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { createFeature } from 'lib';
import { BOLID_HUB_KEY, BolidNotes } from './bolid.notes';
import { appSlice } from '../../../routing/hub/app.routes';

export const bolidRoutes = [
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

createFeature<BolidNotes>(appSlice.bolids, bolidRoutes, BOLID_HUB_KEY);
