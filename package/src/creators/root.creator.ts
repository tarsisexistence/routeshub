import { Route } from '@angular/router';
import { hub, updateHub } from '../hub';
import { DefaultRouteName, LazySlices, Notes, Slice } from '../interfaces';
import { createSlice } from './slice.creator';
import { createNote } from './note.creator';
import { assignCreatorArgs } from '../utils/name';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>(
  routes: Route[],
  detachedFeatures?: LazySlices,
  ...args: (symbol | DefaultRouteName)[]
): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const name = 'app';
  const { key, options } = assignCreatorArgs(args, name);
  const notes: Notes<R> = createNote<R>(routes, options);
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
