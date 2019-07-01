import { Slice, Slices } from '../interfaces';
import { PRIVATE_HUB_KEY } from '../constants';
import { hub } from '../hub';

/**
 * returns aggregated hubs
 */
export const getHubSlices = <T = any>(): Slices<T> => hub.getValue();

/**
 * returns declared slice
 */
export const getSlice = <T = any, C = {}, U = Slice<T, C>>(
  arg: string | symbol
): U =>
  typeof arg === 'string'
    ? hub.value[arg]
    : Object.values((hub.value as Slices) || {}).find(
        (slice: Slice) => slice[PRIVATE_HUB_KEY] === arg
      );
