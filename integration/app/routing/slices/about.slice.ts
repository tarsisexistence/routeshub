import { createFeature, Slice } from 'routeshub';

import { aboutRoute, AboutRoute } from '../describes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const aboutSlice: Slice<AboutRoute> = createFeature<AboutRoute>(
  appSlice.about,
  aboutRoute
);
