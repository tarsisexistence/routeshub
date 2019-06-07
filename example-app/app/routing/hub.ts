import { Slices } from 'lib';

import { AppChildrenNotes, AppNote, appSlice as app } from './hub/app.hub';
import { AboutNote, aboutSlice as about } from '../views/about/hub';
// tslint:disable-next-line:max-line-length
import {
  AutomobileNote,
  automobileSlice as automobiles
} from '../views/automobile/hub';
import { BikeNote, bikeSlice as bikes } from '../views/bike/hub';
import { BolidNote, bolidSlice as bolids } from '../views/bolid/hub';

/**
 * Describes routes hub
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
 * all possible routes in the project
 * and those routes are already stateful
 */
export const hub: Slices<Hub> = {
  app,
  about,
  automobiles,
  bikes,
  bolids
};
