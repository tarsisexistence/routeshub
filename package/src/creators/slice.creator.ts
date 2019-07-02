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
 * Serializes routes
 * to enhance capabilities
 */
export function createSlice<R, C>(
  parentStructure: Structure | null,
  routes: Notes<R, C>
): InternalSlice<R, C> {
  return Object.keys(routes).reduce(
    (acc: InternalSlice<R, C>, key: string): InternalSlice<R, C> => {
      const { children, path, name } = routes[key];
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
}
