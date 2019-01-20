import { Entity, Routes, Structure } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

export function createFeature<T>(
  parentRoute: Structure,
  routes: Routes<T>
): Entity<T> {
  const featureEntity = entitify<T>(parentRoute, routes);
  const updatedRoutesState = updateState(parentRoute.routeName, featureEntity);
  state.next(updatedRoutesState);

  return featureEntity;
}
