import { createFeature, Entity } from 'routeshub';

import { bolidRoute, BolidRoute } from '../routes';
import { appSlice } from './app.slice';

export const bolidSlice: Entity<BolidRoute> = createFeature<BolidRoute>(
  appSlice.bolid,
  bolidRoute
);
