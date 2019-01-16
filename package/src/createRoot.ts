import { Entity, Routes } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

export function createRoot<T, Cr = {}>(
  routes: Routes<T>,
  route: string
): Entity<T & Cr> {
  if (state.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  state.next({} as T & Cr);

  const rootEntity = entitify<T>(null, routes);
  const newEntityValue = updateState(route, rootEntity);
  state.next(newEntityValue);

  return state.value[route] as Entity<T & Cr>;
}
