import { Entities, Entity } from '../../../package';

import {
  AboutBranch,
  AppBranch,
  AutomobileBranch,
  BikeBranch,
  BolidBranch
} from './branches';

import {
  aboutSlice,
  appSlice,
  automobileSlice,
  bikeSlice,
  bolidSlice
} from './slices';

export interface Tree {
  app: Entity<AppBranch>;
  about: Entity<AboutBranch>;
  automobile: Entity<AutomobileBranch>;
  bike: Entity<BikeBranch>;
  bolid: Entity<BolidBranch>;
}

export const TREE: Entities<Tree> = {
  app: appSlice,
  about: aboutSlice,
  automobile: automobileSlice,
  bike: bikeSlice,
  bolid: bolidSlice
};
