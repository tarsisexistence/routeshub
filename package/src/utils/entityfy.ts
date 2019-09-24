import { Unit } from '../interfaces/unit.interfaces';
import { refreshChildren } from './refresh-children';

/**
 * Detects and handles children routes
 */
export const entitify = <R, C>(routes: Unit<R, C>): Unit<R, C> =>
  Object.keys(routes).reduce(
    (acc: Unit<R, C>, key: string): Unit<R, C> => {
      const route = routes[key];

      if (!route.children) {
        return Object.assign({}, acc, { [key]: routes[key] });
      }

      const refreshedChildren = refreshChildren<R, C>(route);
      return Object.assign({}, acc, refreshedChildren);
    },
    {} as Unit<R, C>
  );
