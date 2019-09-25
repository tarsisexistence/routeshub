import { BehaviorSubject } from 'rxjs';
import { Unit, Units } from './interfaces/unit.interfaces';
import { entitify } from './utils/entityfy';
import { PRIVATE_NOTES_KEY } from './constants';
import {
  privateNotesKey,
  unitIdentifier
} from './interfaces/common.interfaces';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject<Units>(null);

/**
 * checks is hub already created
 */
export const isHubCreated = () => hub.value !== null;

/**
 * stores next hub value
 */
export const recordNextHubValue = (value: Units) => hub.next(value);

/**
 * retrieves all units from hub
 */
export const getUnitsFromHub = <T>(): Units<T> => hub.getValue() || {};

/**
 * retrieves unit from hub
 * as intermediate value
 * by name
 */
export const getUnitFromHubByName = <R = any, C = any>(
  name: string
): Unit<R, C> => hub.getValue()[name] as Unit<R, C>;

/**
 * retrieves unit from hub
 * as intermediate value
 * by identifier
 */
export const getUnitFromHubByIdentifier = <R = any, C = any>(
  id: unitIdentifier
): Unit<R, C> | null =>
  Object.values(getUnitsFromHub()).find(
    (unit: Unit) => unit[PRIVATE_NOTES_KEY] === id
  ) as Unit<R, C> | null;

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

  return Object.assign({}, getUnitsFromHub(), {
    [name]: unit
  }) as Units<Unit<R, C>>;
}
