import { createFeature, Entity } from '../../../../package';

import { bikeBranch, BikeBranch } from '../branches';
import { appSlice } from './app.slice';

export const bikeSlice: Entity<BikeBranch> = createFeature<BikeBranch>(
  appSlice.bike,
  bikeBranch
);
