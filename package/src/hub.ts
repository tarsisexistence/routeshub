import { BehaviorSubject } from 'rxjs';
import { Hub, Slice } from './interfaces';
import { entitify } from './utils/entityfy';

/**
 * stores routes states at the same level
 */
export const hub: BehaviorSubject<Hub<any>> = new BehaviorSubject(null);

/**
 * Returns the next hub value
 */
export function nextHubValue<R, C = {}>(
  name: string,
  routes: Slice<R>
): Hub<Slice<R, C>> {
  const slice: Slice<R> = entitify<R, C>(routes);

  return Object.assign({}, hub.value, {
    [name]: slice
  }) as Hub<Slice<R, C>>;
}
