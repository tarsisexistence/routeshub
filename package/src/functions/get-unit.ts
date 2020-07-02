import { Unit, Units } from '../interfaces/unit.interfaces';
import { privateNotesKey } from '../interfaces/common.interfaces';
import {
  getUnitFromHubByIdentifier,
  getUnitFromHubByName,
  getUnitsFromHub
} from '../utils/hub';

/**
 * returns aggregated hubs
 */
export const getRegisteredUnits = <T = any>(): Units<T> => getUnitsFromHub<T>();

/**
 * returns declared unit
 */
export const getUnit = <R = any, C = {}>(arg: privateNotesKey): Unit<R, C> =>
  typeof arg === 'string'
    ? getUnitFromHubByName<R, C>(arg)
    : getUnitFromHubByIdentifier<R, C>(arg);
