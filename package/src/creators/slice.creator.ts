import { indexer } from '../utils/indexer';
import {
  InternalSlice,
  InternalStructure,
  Notes,
  Slice,
  Structure
} from '../interfaces';
import { getState } from '../utils/state';

/**
 * serializes routes to enhance capabilities
 */
export const createSlice = <R, C>(
  parentStructure: Structure | null,
  notes: Notes<R, C>
): InternalSlice<R, C> =>
  Object.keys(notes).reduce(
    (acc: InternalSlice<R, C>, key: string): InternalSlice<R, C> => {
      const { children, path, name } = notes[key];
      const route: InternalStructure = {
        parentId: parentStructure && parentStructure.id,
        state: getState(parentStructure, path),
        id: indexer.next().value,
        path,
        name
      };

      if (children !== undefined) {
        route.children = createSlice(route, children);
      }

      return Object.assign(acc, { [name]: route });
    },
    {} as InternalSlice<R, C>
  );