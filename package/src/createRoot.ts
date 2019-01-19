import { Entity, Routes } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

export function createRoot<T, C = {}>(
  routes: Routes<T>,
  route: string
): Entity<T & C> {
  if (state.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  state.next({} as T & C);

  const rootEntity = entitify<T>(null, routes);
  const newEntityValue = updateState(route, rootEntity);
  state.next(newEntityValue);

  return state.value[route] as Entity<T & C>;
}
