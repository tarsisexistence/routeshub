import { createFeature, Slice } from 'routeshub';

import { bikeRoute, BikeRoute } from '../routes';
import { appSlice } from './app.slice';

export const bikeSlice: Slice<BikeRoute> = createFeature<BikeRoute>(
  appSlice.bike,
  bikeRoute
);
