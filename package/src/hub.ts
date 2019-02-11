import { BehaviorSubject } from 'rxjs';

import { Hub, Slice } from './interfaces';

/**
 * stores routes states at the same level
 */
export const hub: BehaviorSubject<Hub<any>> = new BehaviorSubject(null);

/**
 * Returns the next hub value
 */
export function nextHubValue<T, C = {}>(
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
