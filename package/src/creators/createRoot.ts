import { Hub, RoutesNotes, Slice } from '../interfaces';
import { serialize } from '../utils/serialize';
import { hub, nextHubValue } from '../hub';

/**
 * Creates main parent routes
 * Entry point for the hub
 */
export function createRoot<R, C = {}>(
  routes: RoutesNotes<R>,
  routeName = 'app'
): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const rootSlice: Slice<R> = serialize<R, C>(null, routes);
  const initialRoutesState: Hub<Slice<R, C | {}>> = nextHubValue<R>(
    routeName,
    rootSlice
  );

  hub.next(initialRoutesState);

  return hub.value[routeName];
}
