import { indexer } from './indexer';
import { RoutesNotes, Slice, Structure } from '../interfaces';
import { checkMultiPath, splitPath } from './path';
import { setState, stateFn } from './state';

/**
 * Core function
 * Enhances basic and
 * generates unique routes
 */
export function serialize<T, C = {}>(
  parentSlice: Structure | null,
  routes: RoutesNotes<T, C | {}>
): Slice<T> {
  return Object.keys(routes).reduce((acc: any, routeName: string): Slice<T> => {
    const { children, path, lazyPath } = routes[routeName];
    const route = {
      id: indexer(),
      parentId: parentSlice !== null ? parentSlice.id : null,
      state: setState(parentSlice, path),
      stateFn,
      path: checkMultiPath(path) ? splitPath(path) : path,
      lazyPath,
      routeName
    };

    return {
      ...acc,
      [routeName]: {
        ...route,
        children: children !== undefined ? serialize(route, children) : null
      }
    };
  }, {});
}
