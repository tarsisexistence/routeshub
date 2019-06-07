import { Route } from '@angular/router';
import { enhance } from '../utils/enhance';
import { hub, nextHubValue } from '../hub';
import { setRouteName } from '../utils/name';
import {
  Hub,
  RouteNameOptions,
  RouteNote,
  RoutesNotes,
  Slice
} from '../interfaces';

/**
 * Creates main parent routes
 * Entry point for the hub
 */
export function createRoot<R, C = {}>(
  routes: RoutesNotes<R>,
  name = 'app'
): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const rootSlice: Slice<R> = enhance<R, C>(null, routes);
  const initialRoutesState: Hub<Slice<R, C | {}>> = nextHubValue<R>(
    name,
    rootSlice
  );

  hub.next(initialRoutesState);

  return hub.value[name];
}

/**
 * creates a route note
 */
export const createNote = <R = {}, C = {}>(
  routes: Route[],
  nameOptions: RouteNameOptions = {}
): R & C =>
  routes.reduce(
    (acc: R & C, route: Route): R & C => {
      const note: RouteNote = {
        path: route.path,
        name: route['name'] || setRouteName(route.path, nameOptions)
      };

      if (route.loadChildren) {
        note.lazy = route.loadChildren;
      }

      if (route.children) {
        note.children = createNote(route.children, nameOptions);
      }

      return { ...acc, [note.name]: note };
    },
    {} as R & C
  );
