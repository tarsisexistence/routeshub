import { BehaviorSubject } from 'rxjs';
import { Slice, Slices } from './interfaces/slice.interfaces';
import { entitify } from './utils/entityfy';
import { PRIVATE_NOTES_KEY } from './constants';
import { privateNotesKey } from './interfaces/common.interfaces';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject<Slices>(null);

/**
 * Returns the next hubs value
 */
export function updateHub<R, C>(
  routes: Slice<R, C>,
  name: string,
  key: privateNotesKey
): Slices<Slice<R, C>> {
  const slice: Slice<R> = entitify<R, C>(routes);
  slice[PRIVATE_NOTES_KEY] = key || name;

  return Object.assign({}, hub.value, {
    [name]: slice
  }) as Slices<Slice<R, C>>;
}
