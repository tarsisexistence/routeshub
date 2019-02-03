import { BehaviorSubject } from 'rxjs';

import { Hub, Slice } from './interfaces';

/**
 * it stores the states of all routes on first level
 */
export const hub: BehaviorSubject<Hub<any>> = new BehaviorSubject(null);

/**
 * Updates state via routes or children routes
 */
export function nextStateValue<T, C = {}>(
  routeName: string,
  routes: Slice<T>
): Hub<Slice<T, C>> {
  const slice = entitify<T>(routes);

  // tslint:disable-next-line
  return Object.assign({}, hub.value, {
    [routeName]: slice
  }) as Hub<Slice<T, C>>;
}

/**
 * Detects and handles children routes
 */
const entitify = <T>(routes: Slice<T>) =>
  Object.keys(routes).reduce((acc, routeName) => {
    if (!routes[routeName].children) {
      return { ...acc, [routeName]: routes[routeName] };
    }

    return { ...acc, ...routes[routeName].children };
  }, {});
