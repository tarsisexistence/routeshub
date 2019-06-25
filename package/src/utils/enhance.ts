import { indexer } from './indexer';
import { InternalSlice, Notes, Slice, Structure } from '../interfaces';
import { setState } from './state';

/**
 * Describes an output of enhance fn
 *
 * Could be plain Slice or internal Hub
 * with unprocessed children routes
 */
type Enhanced<R, C> = Slice<R> | InternalSlice<R, C>;

/**
 * Serializes routes
 * to enhance capabilities
 */
export function enhance<R, C = {}>(
  parentSlice: Structure | null,
  routes: Notes<R, C | {}>
): Enhanced<R, C> {
  return Object.keys(routes).reduce(
    (acc: Enhanced<R, C>, key: string): Enhanced<R, C> => {
      const { children, path, name } = routes[key];
      const route = {
        parentId: parentSlice && parentSlice.id,
        state: setState(parentSlice, path),
        id: indexer.next().value,
        path,
        name
      };

      return Object.assign(acc, {
        [name]: {
          ...route,
          children: children !== undefined ? enhance(route, children) : null
        }
      });
    },
    {} as Enhanced<R, C>
  );
}
