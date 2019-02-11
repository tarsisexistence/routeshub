import { Hub, RoutesNotes, Slice, Structure } from '../interfaces';
import { serialize } from '../utils/serialize';
import { hub, nextStateValue } from '../hub';

/**
 * Creates a feature route
 */
export function createFeature<R, C = {}>(
  parentRoute: Structure,
  routes: RoutesNotes<R>
): Slice<R & C> {
  const feature: Slice<R> = serialize<R, C>(parentRoute, routes);
  const updatedRouteState: Hub<Slice<R, C | {}>> = nextStateValue<R>(
    parentRoute.routeName,
    feature
  );
  hub.next(updatedRouteState);

  return hub.value[parentRoute.routeName];
}
