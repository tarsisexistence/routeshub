import { BehaviorSubject } from 'rxjs';
import { Slice, Slices } from './interfaces/slice.interfaces';
import { entitify } from './utils/entityfy';
import { PRIVATE_HUB_KEY } from './constants';

/**
 * stores routes states at the same level
 */
export const hub: BehaviorSubject<Slices<any>> = new BehaviorSubject<
  Slices<any>
>(null);

/**
 * Returns the next hubs value
 */
export function nextHubValue<R, C = {}>(
  routes: Slice<R>,
  name: string,
  key: symbol | string
): Slice<Slice<R, C>> {
  const slice: Slice<R> = entitify<R, C>(routes);
  slice[PRIVATE_HUB_KEY] = key;

  return Object.assign({}, hub.value, {
    [name]: slice
  }) as Slice<Slice<R, C>>;
}
