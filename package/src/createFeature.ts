import { Entity, Routes, Structure } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

export function createFeature<T>(
  parentRoute: Structure,
  routes: Routes<T>
): Entity<T> {
  const featureEntity = entitify<T>(parentRoute, routes);
  const newStateValue = updateState<Entity<T>>(
    parentRoute.route,
    featureEntity
  );
  state.next(newStateValue);

  return featureEntity;
}
