import { Slices } from 'routeshub';

import { AboutRoutes } from 'app/views/about/hub/about.note';
import { AppRoutes } from 'app/routing/hub/app.note';
import { AppChildrenRoutes } from 'app/routing/hub/app-children.note';
import { AutomobileRoutes } from 'app/views/automobile/hub/automobile.note';
import { BikeRoutes } from 'app/views/bike/hub/bike.note';
import { BolidRoutes } from 'app/views/bolid/hub/bolid.note';

import { appSlice as app } from 'app/routing/hub/app.slice';
import { aboutSlice as about } from 'app/views/about/hub';
import { automobileSlice as automobile } from 'app/views/automobile/hub';
import { bikeSlice as bike } from 'app/views/bike/hub';
import { bolidSlice as bolid } from 'app/views/bolid/hub';

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
