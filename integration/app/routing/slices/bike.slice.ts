import { createFeature, Entity } from '../../../../package';

import { bikeRoute, BikeRoute } from '../routes';
import { appSlice } from './app.slice';

export const bikeSlice: Entity<BikeRoute> = createFeature<BikeRoute>(
  appSlice.bike,
  bikeRoute
);
