import { Entities, Entity } from '../../../package';

import {
  AboutBranch,
  AppBranch,
  AutomobileBranch,
  BikeBranch,
  BolidBranch
} from './branches';

import { aboutSlice as about } from './slices/about.slice';
import { appSlice as app } from './slices/app.slice';
import { automobileSlice as automobile } from './slices/automobile.slice';
import { bikeSlice as bike } from './slices/bike.slice';
import { bolidSlice as bolid } from './slices/bolid.slice';

export interface Tree {
  app: Entity<AppBranch>;
  about: Entity<AboutBranch>;
  automobile: Entity<AutomobileBranch>;
  bike: Entity<BikeBranch>;
  bolid: Entity<BolidBranch>;
}

export const tree: Entities<Tree> = {
  app,
  about,
  automobile,
  bike,
  bolid
};
