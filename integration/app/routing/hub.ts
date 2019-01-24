import { Slices } from 'routeshub';

import {
  AboutRoute,
  AppChildrenRoute,
  AppRoute,
  AutomobileRoute,
  BikeRoute,
  BolidRoute
} from './describes';

import {
  aboutSlice as about,
  appSlice as app,
  automobileSlice as automobile,
  bikeSlice as bike,
  bolidSlice as bolid
} from './slices';

/**
 * Describes routes hub
 */
export interface Hub {
  app: AppRoute & AppChildrenRoute;
  about: AboutRoute;
  automobile: AutomobileRoute;
  bike: BikeRoute;
  bolid: BolidRoute;
}

/**
 * Declares hub which contains
 * all possible routes in the project
 * and those routes are already stateful
 */
export const hub: Slices<Hub> = {
  app,
  about,
  automobile,
  bike,
  bolid
};
