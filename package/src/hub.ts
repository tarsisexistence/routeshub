import { BehaviorSubject } from 'rxjs';
import { Slice, Slices } from './interfaces';
import { entitify } from './utils/entityfy';
import { PRIVATE_HUB_KEY } from './constants';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject(null);

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

/**
 * returns aggregated hubs
 */
export const getHubSlices = <T = {}>(): Slices<T> => hub.getValue();

export const getSlice = <T = any, C = {}>(
  arg: string | symbol,
  slices: Slices<any> = hub.value
): Slice<T, C> =>
  typeof arg === 'string'
    ? slices[arg]
    : Object.values((slices as Slices<any>) || {}).find(
        (slice: Slice<any>) => slice[PRIVATE_HUB_KEY] === arg
      );
