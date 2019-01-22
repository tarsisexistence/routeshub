import { createFeature, Slice } from 'routeshub';

import { bolidRoute, BolidRoute } from '../routes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const bolidSlice: Slice<BolidRoute> = createFeature<BolidRoute>(
  appSlice.bolid,
  bolidRoute
);
