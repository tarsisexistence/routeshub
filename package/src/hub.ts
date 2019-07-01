import { BehaviorSubject } from 'rxjs';
import { Slice, Slices } from './interfaces/slice.interfaces';
import { entitify } from './utils/entityfy';
import { PRIVATE_HUB_KEY } from './constants';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject<Slices>(null);

/**
 * Returns the next hubs value
 */
export function updateHub<R, C = {}>(
  routes: Slice<R, C>,
  name: string,
  key: symbol | string
): Slices<Slice<R, C>> {
  const slice: Slice<R> = entitify<R, C>(routes);
  slice[PRIVATE_HUB_KEY] = key || name;

  return Object.assign({}, hub.value, {
    [name]: slice
  }) as Slices<Slice<R, C>>;
}
