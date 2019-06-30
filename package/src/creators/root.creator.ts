import { Route } from '@angular/router';
import { hub, updateHub } from '../hub';
import { CreatorOptionArgs, Notes, Slice } from '../interfaces';
import { createSlice } from './slice.creator';
import { createNote } from './note.creator';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>({
  routes,
  key,
  detachedFeatures,
  nameOptions
}: { routes: Route[] } & Partial<CreatorOptionArgs>): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const name = 'app';
  const notes: Notes<R> = createNote<R>(routes, nameOptions);
  const rootSlice: Slice<R> = createSlice<R, C>(null, notes);
  const initialRoutesState: Slice<Slice<R, C | {}>> = updateHub<R>(
    rootSlice,
    name,
    key
  );

  hub.next(initialRoutesState);

  Object.keys(detachedFeatures || {}).forEach((featureName: string) => {
    detachedFeatures[featureName](null, featureName);
  });

  return hub.value[name];
}
