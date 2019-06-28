import { connectFeatures, createFeature } from 'lib';
import { CarComponent } from '../components/carComponent';
import { CAR_HUB_KEY, CarNotes } from './car.notes';
import { DetailsNotes, detailsSlice } from '../../details/hub';

export const carRoutes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarComponent
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
    path: 'engine/:year',
    pathMatch: 'full',
    component: CarComponent
  }
];

export const carSlice = createFeature<CarNotes>(carRoutes, CAR_HUB_KEY);

connectFeatures<CarNotes, DetailsNotes>(CAR_HUB_KEY, {
  details: detailsSlice
});
