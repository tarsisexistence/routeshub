import { Hub, RoutesNotes, Slice } from './interfaces';
import { serialize } from './utils/serialize';
import { hub, nextStateValue } from './hub';

// TODO: dynamic root route name
/**
 * Creates main parent routes
 * Entry point for hub
 */
export function createRoot<R, C = {}>(
  routes: RoutesNotes<R>,
  routeName = 'app'
): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const rootSlice: Slice<R> = serialize<R, C>(null, routes);
  const initialRoutesState: Hub<Slice<R, C | {}>> = nextStateValue<R>(
    routeName,
    rootSlice
  );

  hub.next(initialRoutesState);

  return hub.value[routeName];
}
