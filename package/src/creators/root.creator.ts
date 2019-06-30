import { Route } from '@angular/router';
import { hub, updateHub } from '../hub';
import { DefaultRouteNames, LazySlices, Notes, Slice } from '../interfaces';
import { createSlice } from './slice.creator';
import { createNote } from './note.creator';

/**
 * possible args
 * in root/feature creators
 */
interface CreatorArgs {
  detachedFeatures: LazySlices;
  routeNames: DefaultRouteNames;
  key: symbol | string;
}

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>({
  routes,
  key,
  detachedFeatures,
  routeNames
}: { routes: Route[] } & Partial<CreatorArgs>): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const name = 'app';
  const notes: Notes<R> = createNote<R>(routes, routeNames);
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
