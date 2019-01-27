import { RoutesNotes, Slice, Store } from './interfaces';
import { enhance } from './utils';
import { nextStateValue, store } from './store';

// TODO: could we provide fully dynamic route name?
/**
 * Creates main parent routes
 * Entry point for hub
 */
export function createRoot<T, C = {}>(
  routes: RoutesNotes<T>,
  routeName: string = 'app'
): Slice<T & C> {
  if (store.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const root: Slice<T> = enhance<T, C>(null, routes);
  const initialRoutesState: Store<Slice<T, C | {}>> = nextStateValue<T>(
    routeName,
    root
  );

  store.next(initialRoutesState);

  return store.value[routeName];
}
