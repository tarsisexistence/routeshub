import { createFeature, Slice } from 'routeshub';

import { aboutRoutes, AboutRoutes } from '../describes';
import { appSlice } from './app.slice';

/**
 * Creates feature routes
 * through parent in the root
 */
export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutRoutes
);
