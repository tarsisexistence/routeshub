import { indexer } from '../utils/indexer';
import { InternalSlice, Notes, Slice, Structure } from '../interfaces';
import { setState } from '../utils/state';

/**
 * Could be plain Slice or internal Hub
 * with unprocessed children routes
 */
type Enhanced<R, C> = Slice<R> | InternalSlice<R, C>;

/**
 * Serializes routes
 * to enhance capabilities
 */
export function createSlice<R, C = {}>(
  parentStructure: Structure | null,
  routes: Notes<R, C | {}>
): Enhanced<R, C> {
  return Object.keys(routes).reduce(
    (acc: Enhanced<R, C>, key: string): Enhanced<R, C> => {
      const { children, path, name } = routes[key];
      const route = {
        parentId: parentStructure && parentStructure.id,
        state: setState(parentStructure, path),
        id: indexer.next().value,
        path,
        name
      };

      return Object.assign(acc, {
        [name]: {
          ...route,
          children: children !== undefined ? createSlice(route, children) : null
        }
      });
    },
    {} as Enhanced<R, C>
  );
}
