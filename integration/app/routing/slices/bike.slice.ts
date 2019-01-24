import { createFeature, Slice } from 'routeshub';

import { bikeRoute, BikeRoute } from '../describes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const bikeSlice: Slice<BikeRoute> = createFeature<BikeRoute>(
  appSlice.bike,
  bikeRoute
);
