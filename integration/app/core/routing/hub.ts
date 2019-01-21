import { Slices } from 'routeshub';

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
  app: AppRoute & AppChildrenRoute;
  about: AboutRoute;
  automobile: AutomobileRoute;
  bike: BikeRoute;
  bolid: BolidRoute;
}

export const hub: Slices<Hub> = {
  app,
  about,
  automobile,
  bike,
  bolid
};
