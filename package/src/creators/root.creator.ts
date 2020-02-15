import { Routes } from '@angular/router';
import { hub, updateHub } from '../hub';
import { CreatorOptionArgs, Notes, Unit, Units } from '../interfaces';
import { createUnit } from './unit.creator';
import { createNote } from './note.creator';
import { connectNearby } from '../functions';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>(
  routes: Routes,
  { key, nearby, routeName }: Partial<CreatorOptionArgs> = {}
): Unit<R, C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared.');
  }

  const defaultRootName = 'app';
  const notes: Notes<R, C> = createNote<R, C>(routes, routeName);
  const rootUnit: Unit<R, C> = createUnit<R, C>(null, notes);
  const initialRoutesState: Units<Unit<R, C>> = updateHub<R, C>(
    rootUnit,
    defaultRootName,
    key
  );

  hub.next(initialRoutesState);

  connectNearby(nearby);

  return hub.value[defaultRootName] as Unit<R, C>;
}
