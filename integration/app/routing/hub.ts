import { Slices } from 'routeshub';

import {
  AboutRoutes,
  AppChildrenRoutes,
  AppRoutes,
  AutomobileRoutes,
  BikeRoutes,
  BolidRoutes
} from './notes';

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
  app: AppRoutes & AppChildrenRoutes;
  about: AboutRoutes;
  automobile: AutomobileRoutes;
  bike: BikeRoutes;
  bolid: BolidRoutes;
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
