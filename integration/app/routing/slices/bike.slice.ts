import { createFeature, Slice } from 'routeshub';

import { bikeRoutes, BikeRoutes } from '../describes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const bikeSlice: Slice<BikeRoutes> = createFeature<BikeRoutes>(
  appSlice.bike,
  bikeRoutes
);
