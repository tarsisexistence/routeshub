import { Routes } from '@angular/router';
import { CreatorOptionArgs, Notes, Unit, Units } from '../interfaces';
import { createUnit } from './unit.creator';
import { createNote } from './note.creator';
import { connectNearby } from '../functions';
import { DEFAULT_ROOT_NAME } from '../constants';
import {
  getUnitFromHubByName,
  isHubCreated,
  recordNextHubValue,
  updateHub
} from '../utils/hub';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>(
  routes: Routes,
  { key, nearby, routeName }: Partial<CreatorOptionArgs> = {}
): Unit<R, C> {
  if (isHubCreated()) {
    throw new Error('Routeshub is already declared.');
  }

  const notes: Notes<R, C> = createNote<R, C>(routes, routeName);
  const rootUnit: Unit<R, C> = createUnit<R, C>(null, notes);
  const initialRoutesState: Units<Unit<R, C>> = updateHub<R, C>(
    rootUnit,
    DEFAULT_ROOT_NAME,
    key
  );

  recordNextHubValue(initialRoutesState);

  connectNearby(nearby);

  return getUnitFromHubByName<R, C>(DEFAULT_ROOT_NAME);
}
