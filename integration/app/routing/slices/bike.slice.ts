import { hub } from '../../core/core.module';
import { bikeBranch, BikeBranch } from '../branches';
import { appSlice } from './app.slice';

export const bikeSlice = hub.createFeature<BikeBranch>(
  appSlice.bike,
  bikeBranch
);
