import { Slice, Slices } from '../interfaces';
import { entitify } from '../utils/entityfy';
import { PRIVATE_HUB_KEY } from '../constants';
import { hub } from '../hub';

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

/**
 * returns declared slice
 */
export const getSlice = <T = any, C = {}>(arg: string | symbol): Slice<T, C> =>
  typeof arg === 'string'
    ? hub.value[arg]
    : Object.values((hub.value as Slices<any>) || {}).find(
        (slice: Slice<any>) => slice[PRIVATE_HUB_KEY] === arg
      );
