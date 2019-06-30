import { Route } from '@angular/router';
import { hub, updateHub } from '../hub';
import { CreatorOptionArgs, Notes, Slice } from '../interfaces';
import { createSlice } from './slice.creator';
import { createNote } from './note.creator';
import { connectDetached } from '../functions';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>({
  routes,
  key,
  detachedFeatures,
  routeNames
}: { routes: Route[] } & Partial<CreatorOptionArgs>): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const defaultRootName = 'app';
  const notes: Notes<R> = createNote<R>(routes, routeNames);
  const rootSlice: Slice<R> = createSlice<R, C>(null, notes);
  const initialRoutesState: Slice<Slice<R, C | {}>> = updateHub<R>(
    rootSlice,
    defaultRootName,
    key
  );

  hub.next(initialRoutesState);

  connectDetached(detachedFeatures);

  return hub.value[defaultRootName];
}
