import { createFeature, Entity } from '../../../../package';

import { aboutBranch, AboutBranch } from '../branches';
import { appSlice } from './app.slice';

export const aboutSlice: Entity<AboutBranch> = createFeature<AboutBranch>(
  appSlice.about,
  aboutBranch
);
