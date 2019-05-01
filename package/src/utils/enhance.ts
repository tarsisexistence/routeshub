import { indexer } from './indexer';
import { InternalSlice, RoutesNotes, Slice, Structure } from '../interfaces';
import { checkMultiPath, splitPath } from './path';
import { setState } from './state';

/**
 * Describes an output of enhance fn
 *
 * Could be plain Slice or internal slice
 * with unprocessed children routes
 */
type Enhanced<R, C> = Slice<R> | InternalSlice<R, C>;

/**
 * Serializes routes
 * to enhance capabilities
 */
export function enhance<R, C = {}>(
  parentSlice: Structure | null,
  routes: RoutesNotes<R, C | {}>
): Enhanced<R, C> {
  return Object.keys(routes).reduce(
    (acc: Enhanced<R, C>, routeName: string): Enhanced<R, C> => {
      const { children, path, lazy } = routes[routeName];
      const state = setState(parentSlice, path);
      const route = {
        id: indexer.next().value,
        parentId: parentSlice !== null ? parentSlice.id : null,
        state,
        path: checkMultiPath(path) ? splitPath(path) : path,
        lazy: lazy ? lazy : null,
        routeName
      };

      return Object.assign(acc, {
        [routeName]: {
          ...route,
          children: children !== undefined ? enhance(route, children) : null
        }
      });
    },
    {} as Enhanced<R, C>
  );
}
