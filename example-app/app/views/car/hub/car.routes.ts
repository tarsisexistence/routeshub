import { createFeature } from 'lib';
import { CarComponent } from '../components/carComponent';
import { CAR_HUB_KEY, CarNotes } from './car.notes';
import { detailsSlice } from '../../details/hub';

export const carRoutes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarComponent
  },
  {
    path: 'engine/:year',
    pathMatch: 'full',
    component: CarComponent
  }
];

export const carSlice = createFeature<CarNotes>({
  routes: carRoutes,
  detachedFeatures: { details: detailsSlice },
  key: CAR_HUB_KEY
});
