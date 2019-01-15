import { Entity } from '../../../../package';
import { hub } from '../';

import { bikeBranch, BikeBranch } from '../branches';
import { appSlice } from './app.slice';

export const bikeSlice: Entity<BikeBranch> = hub.createFeature<BikeBranch>(
  appSlice.bike,
  bikeBranch
);
