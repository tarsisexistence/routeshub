import { Hub, RoutesNotes, Slice } from '../interfaces';
import { enhance } from '../utils/enhance';
import { hub, nextHubValue } from '../hub';

/**
 * Creates main parent routes
 * Entry point for the hub
 */
export function createRoot<R, C = {}>(
  routes: RoutesNotes<R>,
  name = 'app'
): Slice<R & C> {
  if (hub.value !== null) {
    throw new Error('Routeshub is already declared');
  }

  const rootSlice: Slice<R> = enhance<R, C>(null, routes);
  const initialRoutesState: Hub<Slice<R, C | {}>> = nextHubValue<R>(
    name,
    rootSlice
  );

  hub.next(initialRoutesState);

  return hub.value[name];
}
