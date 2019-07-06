import { Slice } from '../interfaces';
import { refreshChildren } from './refresh-children';

/**
 * Detects and handles children routes
 */
export const entitify = <R, C>(routes: Slice<R, C>): Slice<R, C> =>
  Object.keys(routes).reduce(
    (acc: Slice<R, C>, key: string): Slice<R, C> => {
      const route = routes[key];

      if (!route.children) {
        return Object.assign({}, acc, { [key]: routes[key] });
      }

      const refreshedChildren = refreshChildren<R, C>(route);
      return Object.assign({}, acc, refreshedChildren);
    },
    {} as Slice<R, C>
  );
