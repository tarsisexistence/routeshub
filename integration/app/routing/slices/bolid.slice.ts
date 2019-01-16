import { createFeature, Entity } from '../../../../package';

import { bolidBranch, BolidBranch } from '../branches';
import { appSlice } from './app.slice';

export const bolidSlice: Entity<BolidBranch> = createFeature<BolidBranch>(
  appSlice.bolid,
  bolidBranch
);
