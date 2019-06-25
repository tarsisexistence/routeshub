import { getHubSlices, Slices } from 'lib';
import { AppChildNotes, AppNotes } from './hub';
import { BolidNotes } from '../views/bolid/hub';
import { BikeNotes } from '../views/bike/hub';
import { AutomobileNotes } from '../views/automobile/hub';
import { AboutNotes } from '../views/about/hub';

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
export const hub = getHubSlices<Hub>();
