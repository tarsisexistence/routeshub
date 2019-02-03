import { Slices } from 'routeshub';

import { AboutRoutes } from 'app/views/about/hub/about.notes';
import { AppNotes } from 'app/routing/hub/app.notes';
import { AppChildrenNotes } from 'app/routing/hub/app-children.notes';
import { AutomobileNotes } from 'app/views/automobile/hub/automobile.notes';
import { BikeNotes } from 'app/views/bike/hub/bike.notes';
import { BolidNotes } from 'app/views/bolid/hub/bolid.notes';

import { appSlice as app } from 'app/routing/hub/app.slice';
import { aboutSlice as about } from 'app/views/about/hub';
import { automobileSlice as automobile } from 'app/views/automobile/hub';
import { bikeSlice as bike } from 'app/views/bike/hub';
import { bolidSlice as bolid } from 'app/views/bolid/hub';

/**
 * Describes routes hub
 */
export interface Hub {
  app: AppNotes & AppChildrenNotes;
  about: AboutRoutes;
  automobile: AutomobileNotes;
  bike: BikeNotes;
  bolid: BolidNotes;
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
