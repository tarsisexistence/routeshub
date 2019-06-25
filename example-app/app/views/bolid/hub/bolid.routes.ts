import { connectFeatures, createFeature } from 'lib';
import { BolidComponent } from '../container/bolid.component';
import { VehiclesResolver } from '../../../routing/resolvers/vehicles.resolver';
import { BOLID_HUB_KEY, BolidNotes } from './bolid.notes';
import { DetailsNotes, detailsSlice } from '../../details/hub';

export const bolidRoutes = [
  {
    path: '',
    pathMatch: 'full',
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  },
  {
    path: 'details',
    pathMatch: 'full',
    loadChildren: () =>
      import('example-app/app/views/details/details.module').then(
        m => m.DetailsModule
      )
  },
  {
    path: ':year',
    pathMatch: 'full',
    component: BolidComponent,
    resolve: { vehicles: VehiclesResolver }
  }
];

export const bolidSlice = createFeature<BolidNotes>(bolidRoutes, BOLID_HUB_KEY);

connectFeatures<BolidNotes, DetailsNotes>(BOLID_HUB_KEY, {
  details: detailsSlice
});
