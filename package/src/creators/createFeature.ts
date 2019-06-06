import { Hub, RoutesNotes, Slice, Structure } from '../interfaces';
import { enhance } from '../utils/enhance';
import { hub, nextHubValue } from '../hub';

/**
 * Creates a feature route
 */
export function createFeature<R, C = {}>(
  parentRoute: Structure,
  routes: RoutesNotes<R>
): Slice<R & C> {
  const feature: Slice<R> = enhance<R, C>(parentRoute, routes);
  const updatedRouteState: Hub<Slice<R, C | {}>> = nextHubValue<R>(
    parentRoute.name,
    feature
  );
  hub.next(updatedRouteState);

  return hub.value[parentRoute.name];
}
