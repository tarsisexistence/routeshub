import { getHubSlices, Slices } from 'lib';
import { AppChildNotes, AppNotes } from './hub/app.notes';
import { BolidNotes } from '../views/bolid/hub/bolid.notes';
import { BikeNotes } from '../views/bike/hub/bike.notes';
import { AutomobileNotes } from '../views/automobile/hub/automobile.notes';
import { AboutNotes } from '../views/about/hub/about.notes';

/**
 * Describes the project's hubs
 */
export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  automobiles: AutomobileNotes;
  bikes: BikeNotes;
  bolids: BolidNotes;
}

/**
 * Declares hubs which contains
 * all existed slices in the project
 */
export const hub: Slices<Hub> = getHubSlices<Hub>();
