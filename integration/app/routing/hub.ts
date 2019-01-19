import { Entities, Entity } from '../../../package';

// knot ? unit ?
import {
  AboutRoute,
  AppChildrenRoute,
  AppRoute,
  AutomobileRoute,
  BikeRoute,
  BolidRoute
} from './routes';

import {
  aboutSlice as about,
  appSlice as app,
  automobileSlice as automobile,
  bikeSlice as bike,
  bolidSlice as bolid
} from './slices';

export interface Hub {
  app: Entity<AppRoute, AppChildrenRoute>;
  about: Entity<AboutRoute>;
  automobile: Entity<AutomobileRoute>;
  bike: Entity<BikeRoute>;
  bolid: Entity<BolidRoute>;
}

export const hub: Entities<Hub> = {
  app,
  about,
  automobile,
  bike,
  bolid
};
