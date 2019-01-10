import { hub } from '../../core/core.module';

import { aboutBranch, AboutBranch } from '../branches';

import { appSlice } from './app.slice';

export const aboutSlice = hub.createFeature<AboutBranch>(
  appSlice.root,
  aboutBranch
);
