import { RoutesNotes, Slice, Store, Structure } from './interfaces';
import { enhance } from './utils';
import { nextStateValue, store } from './store';

/**
 * Creates feature route
 * Each feature module declares its routes from here
 */
export function createFeature<T, C = {}>(
  parentRoute: Structure,
  routes: RoutesNotes<T>
): Slice<T & C> {
  const feature: Slice<T> = enhance<T, C>(parentRoute, routes);
  const updatedRouteState: Store<Slice<T, C | {}>> = nextStateValue<T>(
    parentRoute.routeName,
    feature
  );
  store.next(updatedRouteState);

  return store.value[parentRoute.routeName];
}
