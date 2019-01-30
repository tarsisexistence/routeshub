import { Hub, RoutesNotes, Slice, Structure } from './interfaces';
import { serialize } from './utils/serialize';
import { hub, nextStateValue } from './hub';

/**
 * Creates feature route
 * Each feature module declares its routes from here
 */
export function createFeature<T, C = {}>(
  parentRoute: Structure,
  routes: RoutesNotes<T>
): Slice<T & C> {
  const feature: Slice<T> = serialize<T, C>(parentRoute, routes);
  const updatedRouteState: Hub<Slice<T, C | {}>> = nextStateValue<T>(
    parentRoute.routeName,
    feature
  );
  hub.next(updatedRouteState);

  return hub.value[parentRoute.routeName];
}
