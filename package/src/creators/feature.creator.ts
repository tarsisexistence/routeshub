import { Route } from '@angular/router';
import { Slice, Structure } from '../interfaces';
import { hub } from '../hub';
import { createNote } from './note.creator';
import { enhance } from '../utils/enhance';
import { nextHubValue } from '../functions/hub';

/**
 * Creates a feature route
 */
export function createFeature<R = any, C = {}>(
  parentRoute: Structure,
  routes: Route[],
  key?: symbol
): Slice<R & C> {
  const note: R = createNote<R>(routes);
  const feature: Slice<R> = enhance<R, C>(parentRoute, note);
  const updatedRouteState: Slice<Slice<R, C | {}>> = nextHubValue<R>(
    feature,
    parentRoute.name,
    key || parentRoute.name
  );
  hub.next(updatedRouteState);

  return hub.value[parentRoute.name];
}
