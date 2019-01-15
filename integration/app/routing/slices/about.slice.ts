import { Entity } from '../../../../package';
import { hub } from '../';

import { aboutBranch, AboutBranch } from '../branches';
import { appSlice } from './app.slice';

export const aboutSlice: Entity<AboutBranch> = hub.createFeature<AboutBranch>(
  appSlice.about,
  aboutBranch
);
