import { createFeature, Slice } from 'routeshub';

import { automobileRoute, AutomobileRoute } from '../routes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const automobileSlice: Slice<AutomobileRoute> = createFeature<
  AutomobileRoute
>(appSlice.automobile, automobileRoute);
