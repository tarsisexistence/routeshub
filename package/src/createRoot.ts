import { Entity, Routes } from './interfaces';
import { entitify } from './utils';
import { state, updateState } from './state';

// TODO: could we provide fully dynamic route name?
export function createRoot<T, C = {}>(
  routes: Routes<T>,
  routeName: string = 'app'
): Entity<T & C> {
  if (state.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const rootEntity = entitify<T>(null, routes);
  const newRoutesState = updateState(routeName, rootEntity);

  state.next(newRoutesState);

  return state.value[routeName];
}
