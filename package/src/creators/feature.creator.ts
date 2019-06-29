import { Route } from '@angular/router';
import { DefaultRouteName, Notes, Slice, Structure } from '../interfaces';
import { hub, updateHub } from '../hub';
import { createNote } from './note.creator';
import { createSlice } from './slice.creator';
import { assignCreatorArgs } from '../utils/name';

/**
 * Creates a feature route
 */
export function createFeature<R = any, C = {}>(
  routes: Route[],
  ...args: (symbol | DefaultRouteName | ((parent: Structure) => Slice<any>)[])[]
): (parentRoute: Structure) => Slice<R & C> {
  return (parentRoute: Structure): Slice<R & C> => {
    const { key, options, siblings } = assignCreatorArgs(args, name);
    const notes: Notes<R> = createNote<R>(routes, options);
    const feature: Slice<R> = createSlice<R, C>(parentRoute, notes);
    siblings.forEach(sibling => {
      sibling(null);
    });
    const updatedRouteState: Slice<Slice<R, C | {}>> = updateHub<R>(
      feature,
      parentRoute.name,
      key || parentRoute.name
    );
    hub.next(updatedRouteState);

    return hub.value[parentRoute.name];
  };
}
