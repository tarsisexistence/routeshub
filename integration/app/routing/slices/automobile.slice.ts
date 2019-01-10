import { hub } from '../../core/core.module';
import { automobileBranch, AutomobileBranch } from '../branches';
import { appSlice } from './app.slice';

export const automobileSlice = hub.createFeature<AutomobileBranch>(
  appSlice.root,
  automobileBranch
);
