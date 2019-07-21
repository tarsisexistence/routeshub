import { Slice, Slices } from '../interfaces';
import { PRIVATE_NOTES_KEY } from '../constants';
import { hub } from '../hub';
import { privateNotesKey } from '../interfaces/common.interfaces';

/**
 * returns aggregated hubs
 */
export const getHubSlices = <T = any>(): Slices<T> => hub.getValue();

/**
 * returns declared slice
 */
export const getSlice = <R = any, C = {}>(arg: privateNotesKey): Slice<R, C> =>
  typeof arg === 'string'
    ? hub.value[arg]
    : Object.values((hub.value as Slices) || {}).find(
        (slice: Slice) => slice[PRIVATE_NOTES_KEY] === arg
      );
