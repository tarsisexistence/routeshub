import { Entity, Routes, State } from './interfaces';
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

  const root: Entity<T> = entitify<T, C>(null, routes);
  const initialRoutesState: State<Entity<T, C | {}>> = updateState<T>(
    routeName,
    root
  );

  state.next(initialRoutesState);

  return state.value[routeName];
}
