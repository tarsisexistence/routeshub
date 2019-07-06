import { Routes } from '@angular/router';
import { hub, updateHub } from '../hub';
import { CreatorOptionArgs, Notes, Slice, Slices } from '../interfaces';
import { createSlice } from './slice.creator';
import { createNote } from './note.creator';
import { connectDetached } from '../functions';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>(
  routes: Routes,
  { key, detached, routeName }: Partial<CreatorOptionArgs> = {}
): Slice<R, C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }
  const defaultRootName = 'app';
  const notes: Notes<R, C> = createNote<R, C>(routes, routeName);
  const rootSlice: Slice<R, C> = createSlice<R, C>(null, notes);
  const initialRoutesState: Slices<Slice<R, C>> = updateHub<R, C>(
    rootSlice,
    defaultRootName,
    key
  );

  hub.next(initialRoutesState);

  connectDetached(detached);

  return hub.value[defaultRootName];
}
