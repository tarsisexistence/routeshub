import { createFeature, Slice } from 'routeshub';

import { aboutNote, AboutRoutes } from './about.note';
import { appSlice } from '~app/routing/hub/app.slice';

/**
 * Creates feature slice
 */
export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNote
);
