import { Entity, Routes, State, Structure } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

/**
 * Creates feature route
 * Each feature module declares its routes from here
 */
export function createFeature<T, C = {}>(
  parentRoute: Structure,
  routes: Routes<T>
): Entity<T & C> {
  const featureEntity: Entity<T> = entitify<T, C>(parentRoute, routes);
  const updatedRouteState: State<Entity<T, C | {}>> = updateState<T>(
    parentRoute.routeName,
    featureEntity
  );
  state.next(updatedRouteState);

  return state.value[parentRoute.routeName];
}
