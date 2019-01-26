import { RoutesNotes, Slice, State, Structure } from './interfaces';
import { enhance } from './utils';
import { nextStateValue, state } from './state';

/**
 * Creates feature route
 * Each feature module declares its routes from here
 */
export function createFeature<T, C = {}>(
  parentRoute: Structure,
  routes: RoutesNotes<T>
): Slice<T & C> {
  const feature: Slice<T> = enhance<T, C>(parentRoute, routes);
  const updatedRouteState: State<Slice<T, C | {}>> = nextStateValue<T>(
    parentRoute.routeName,
    feature
  );
  state.next(updatedRouteState);

  return state.value[parentRoute.routeName];
}
