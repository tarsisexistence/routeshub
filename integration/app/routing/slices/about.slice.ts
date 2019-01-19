import { createFeature, Entity } from 'routeshub';

import { aboutRoute, AboutRoute } from '../routes';
import { appSlice } from './app.slice';

export const aboutSlice: Entity<AboutRoute> = createFeature<AboutRoute>(
  appSlice.about,
  aboutRoute
);
