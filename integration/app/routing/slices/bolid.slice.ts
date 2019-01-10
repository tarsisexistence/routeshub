import { hub } from '../../core/core.module';
import { bolidBranch, BolidBranch } from '../branches';
import { appSlice } from './app.slice';

export const bolidSlice = hub.createFeature<BolidBranch>(
  appSlice.root,
  bolidBranch
);
