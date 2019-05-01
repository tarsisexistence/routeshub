import { Slice } from '../interfaces';
import { refreshChildren } from './refresh-children';

/**
 * Detects and handles children routes
 */
export const entitify = <R, C>(routes: Slice<R>): Slice<R, C> =>
  Object.keys(routes).reduce(
    (acc: Slice<R, C>, routeName: string): Slice<R, C> => {
      if (!routes[routeName].children) {
        return Object.assign({}, acc, { [routeName]: routes[routeName] });
      }

      const refreshedChildren = refreshChildren<R, C>(routes[routeName]);
      return Object.assign({}, acc, refreshedChildren);
    },
    {} as Slice<R, C>
  );
