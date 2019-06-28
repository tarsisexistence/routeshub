import { getHubSlices } from 'lib';
import { AppChildNotes, AppNotes } from './hub';
import { CarNotes } from '../views/car/hub';
import { AboutNotes } from '../views/about/hub';

/**
 * Describes the project's hubs
 */
export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  car: CarNotes;
}

/**
 * Declares hubs which contains
 * all existed slices in the project
 */
export const hub = getHubSlices<Hub>();
