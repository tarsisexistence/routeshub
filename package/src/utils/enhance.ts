import { indexer } from './indexer';
import { RoutesNotes, Slice, Structure } from '../interfaces';
import { checkMultiPath, splitPath } from './path';
import { setState, stateFn } from './state';

/**
 * Serializes routes
 * to enhance capabilities
 */
export function enhance<T, C = {}>(
  parentSlice: Structure | null,
  routes: RoutesNotes<T, C | {}>
): Slice<T> {
  return Object.keys(routes).reduce((acc: any, routeName: string): Slice<T> => {
    const { children, path, lazyPath } = routes[routeName];
    const state = setState(parentSlice, path);
    const route = {
      id: indexer(),
      parentId: parentSlice !== null ? parentSlice.id : null,
      state,
      stateFn: stateFn.bind(null, state),
      path: checkMultiPath(path) ? splitPath(path) : path,
      lazyPath,
      routeName
    };

    return {
      ...acc,
      [routeName]: {
        ...route,
        children: children !== undefined ? enhance(route, children) : null
      }
    };
  }, {});
}
