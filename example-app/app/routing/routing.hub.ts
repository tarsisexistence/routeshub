import { getHub, Slices } from 'lib';
import { AppChildNotes, AppNotes } from './hub/app.hub';
import { BolidNotes } from '../views/bolid/hub/bolid.hub';
import { BikeNotes } from '../views/bike/hub/bike.hub';
import { AutomobileNotes } from '../views/automobile/hub/automobile.hub';
import { AboutNotes } from '../views/about/hub/about.hub';

/**
 * Describes the project's hub
 */
export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  automobiles: AutomobileNotes;
  bikes: BikeNotes;
  bolids: BolidNotes;
}

/**
 * Declares hub which contains
 * all existed slices in the project
 */
export const hub: Slices<Hub> = getHub<Hub>();
