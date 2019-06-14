import { Route } from '@angular/router';
import { enhance } from '../utils/enhance';
import { hub, nextHubValue } from '../hub';
import { DefaultRouteName, Slice } from '../interfaces';
import { createNote } from './note.creator';
import { assignCreatorArgs } from '../utils/name';

/**
 * Creates main parent routes
 * Entry point for the hubs
 */
export function createRoot<R = any, C = any>(
  routes: Route[],
  ...args: (symbol | DefaultRouteName)[]
): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const name = 'app';
  const { key, options } = assignCreatorArgs(args, name);
  const note: R = createNote<R>(routes, options);
  const rootSlice: Slice<R> = enhance<R, C>(null, note);
  const initialRoutesState: Slice<Slice<R, C | {}>> = nextHubValue<R>(
    rootSlice,
    name,
    key
  );

  hub.next(initialRoutesState);

  return hub.value[name];
}
