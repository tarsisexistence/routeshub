import { Hub, RoutesNotes, Slice } from './interfaces';
import { serialize } from './utils/serialize';
import { hub, nextStateValue } from './hub';

// TODO: could we provide fully dynamic route name?
/**
 * Creates main parent routes
 * Entry point for hub
 */
export function createRoot<T, C = {}>(
  routes: RoutesNotes<T>,
  routeName: string = 'app'
): Slice<T & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const rootSlice: Slice<T> = serialize<T, C>(null, routes);
  const initialRoutesState: Hub<Slice<T, C | {}>> = nextStateValue<T>(
    routeName,
    rootSlice
  );

  hub.next(initialRoutesState);

  return hub.value[routeName];
}
