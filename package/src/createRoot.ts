import { Describes, Slice, State } from './interfaces';
import { enhance } from './utils';
import { state, updateState } from './state';

// TODO: could we provide fully dynamic route name?
/**
 * Creates main parent routes
 * Entry point for hub
 */
export function createRoot<T, C = {}>(
  routes: Describes<T>,
  routeName: string = 'app'
): Slice<T & C> {
  if (state.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const root: Slice<T> = enhance<T, C>(null, routes);
  const initialRoutesState: State<Slice<T, C | {}>> = updateState<T>(
    routeName,
    root
  );

  state.next(initialRoutesState);

  return state.value[routeName];
}
