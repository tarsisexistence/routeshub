import { createFeature, Slice } from '../../../../../package';

import { appSlice } from '../../../routing/hub/app.slice';
import { aboutNotes, AboutRoutes } from './about.notes';

/**
 * Creates a feature slice
 */
export const aboutSlice: Slice<AboutRoutes> = createFeature<AboutRoutes>(
  appSlice.about,
  aboutNotes
);
