import { Entities, Entity } from '../../../package';

import {
  AboutBranch,
  AppBranch,
  AutomobileBranch,
  BikeBranch,
  BolidBranch
} from './branches';

import {
  aboutSlice as about,
  appSlice as app,
  automobileSlice as automobile,
  bikeSlice as bike,
  bolidSlice as bolid
} from './slices';

export interface Hub {
  app: Entity<AppBranch>;
  about: Entity<AboutBranch>;
  automobile: Entity<AutomobileBranch>;
  bike: Entity<BikeBranch>;
  bolid: Entity<BolidBranch>;
}

export const hub: Entities<Hub> = {
  app,
  about,
  automobile,
  bike,
  bolid
};
