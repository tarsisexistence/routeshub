import { createFeature, Slice } from 'routeshub';

import { automobileRoutes, AutomobileRoutes } from '../notes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const automobileSlice: Slice<AutomobileRoutes> = createFeature<
  AutomobileRoutes
>(appSlice.automobile, automobileRoutes);
