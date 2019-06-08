import { createUnion, getHub } from 'lib';
import { AppChildrenNotes, AppNote, appSlice } from './hub/app.hub';
import { AboutNote, aboutSlice } from '../views/about/hub';
import { AutomobileNote, automobileSlice } from '../views/automobile/hub';
import { BikeNote, bikeSlice } from '../views/bike/hub';
import { BolidNote, bolidSlice } from '../views/bolid/hub';

/**
 * Describes the project's hub
 */
export interface Hub {
  app: AppNote & AppChildrenNotes;
  about: AboutNote;
  automobiles: AutomobileNote;
  bikes: BikeNote;
  bolids: BolidNote;
}

/**
 * Declares hub which contains
 * all existed slices in the project
 */
export const hub = getHub<Hub>();

/**
 * Another way getting slices
 * but this one provides slices on demand
 *
 * Illustrated here just for example purpose
 *
 * Practical example of unions is in header component
 */
export const union = createUnion({
  app: appSlice,
  about: aboutSlice,
  automobiles: automobileSlice,
  bikes: bikeSlice,
  bolids: bolidSlice
});
