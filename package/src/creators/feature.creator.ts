import { Route } from '@angular/router';
import { DefaultRouteName, Slice, Structure } from '../interfaces';
import { hub, nextHubValue } from '../hub';
import { createNote } from './note.creator';
import { enhance } from '../utils/enhance';
import { assignCreatorArgs } from '../utils/name';

/**
 * Creates a feature route
 */
export function createFeature<R = any, C = {}>(
  routes: Route[],
  ...args: (symbol | DefaultRouteName)[]
): (parentRoute: Structure) => Slice<R & C> {
  return (parentRoute: Structure): Slice<R & C> => {
    const { key, options } = assignCreatorArgs(args, name);
    const note: R = createNote<R>(routes, options);
    const feature: Slice<R> = enhance<R, C>(parentRoute, note);
    const updatedRouteState: Slice<Slice<R, C | {}>> = nextHubValue<R>(
      feature,
      parentRoute.name,
      key || parentRoute.name
    );
    hub.next(updatedRouteState);

    return hub.value[parentRoute.name];
  };
}
