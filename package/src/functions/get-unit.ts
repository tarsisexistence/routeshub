import { Unit, Units } from '../interfaces/unit.interfaces';
import { PRIVATE_NOTES_KEY } from '../constants';
import { hub } from '../hub';
import { privateNotesKey } from '../interfaces/common.interfaces';

/**
 * returns aggregated hubs
 */
export const getRegisteredUnits = <T = any>(): Units<T> => hub.getValue();

/**
 * returns declared unit
 */
export const getUnit = <R = any, C = {}>(arg: privateNotesKey): Unit<R, C> =>
  typeof arg === 'string'
    ? (hub.value[arg] as Unit<R, C>)
    : (Object.values((hub.value as Units) || {}).find(
        (unit: Unit) => unit[PRIVATE_NOTES_KEY] === arg
      ) as Unit<R, C>);
