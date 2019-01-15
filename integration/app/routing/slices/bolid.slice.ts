import { Entity } from '../../../../package';
import { hub } from '../';

import { bolidBranch, BolidBranch } from '../branches';
import { appSlice } from './app.slice';

export const bolidSlice: Entity<BolidBranch> = hub.createFeature<BolidBranch>(
  appSlice.bolid,
  bolidBranch
);
