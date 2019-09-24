import { BehaviorSubject } from 'rxjs';
import { Unit, Units } from './interfaces/unit.interfaces';
import { entitify } from './utils/entityfy';
import { PRIVATE_NOTES_KEY } from './constants';
import { privateNotesKey } from './interfaces/common.interfaces';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject<Units>(null);

/**
 * Returns the next hubs value
 */
export function updateHub<R, C>(
  routes: Unit<R, C>,
  name: string,
  key: privateNotesKey
): Units<Unit<R, C>> {
  const unit: Unit<R> = entitify<R, C>(routes);
  unit[PRIVATE_NOTES_KEY] = key || name;

  return Object.assign({}, hub.value, {
    [name]: unit
  }) as Units<Unit<R, C>>;
}
