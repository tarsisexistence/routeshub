import { Routes, Slice, State, Structure } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

/**
 * Creates feature route
 * Each feature module declares its routes from here
 */
export function createFeature<T, C = {}>(
  parentRoute: Structure,
  routes: Routes<T>
): Slice<T & C> {
  const feature: Slice<T> = entitify<T, C>(parentRoute, routes);
  const updatedRouteState: State<Slice<T, C | {}>> = updateState<T>(
    parentRoute.routeName,
    feature
  );
  state.next(updatedRouteState);

  return state.value[parentRoute.routeName];
}
