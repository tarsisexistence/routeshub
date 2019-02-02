import { createFeature, Slice } from 'routeshub';

import { appSlice } from '~app/routing/hub/app.slice';
import { aboutNotes, AboutRoutes } from './about.note';

/**
 * Creates a feature slice
 */
export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNotes
);
