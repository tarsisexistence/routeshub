import { createFeature, Slice } from 'routeshub';

import { aboutRoute, AboutRoute } from '../routes';
import { appSlice } from './app.slice';

export const aboutSlice: Slice<AboutRoute> = createFeature<AboutRoute>(
  appSlice.about,
  aboutRoute
);
