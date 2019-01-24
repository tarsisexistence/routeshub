import { createFeature, Slice } from 'routeshub';

import { bolidRoutes, BolidRoutes } from '../describes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const bolidSlice: Slice<BolidRoutes> = createFeature<BolidRoutes>(
  appSlice.bolid,
  bolidRoutes
);
