/* tslint:disable:prefer-object-spread */
import { BehaviorSubject } from 'rxjs';
import { Hub, Slice } from './interfaces';
import { refreshChildren } from './utils/refresh-children';

/**
 * stores routes states at the same level
 */
export const hub: BehaviorSubject<Hub<any>> = new BehaviorSubject(null);

/**
 * Detects and handles children routes
 */
const entitify = <R, C>(routes: Slice<R>): Slice<R, C> =>
  Object.keys(routes).reduce(
    (acc: Slice<R, C>, routeName: string): Slice<R, C> =>
      routes[routeName].children
        ? Object.assign({}, acc, refreshChildren<R, C>(routes[routeName]))
        : Object.assign({}, acc, { [routeName]: routes[routeName] }),
    {} as Slice<R, C>
  );

/**
 * Returns the next hub value
 */
export function nextHubValue<R, C = {}>(
  routeName: string,
  routes: Slice<R>
): Hub<Slice<R, C>> {
  const slice: Slice<R> = entitify<R, C>(routes);

  return Object.assign({}, hub.value, {
    [routeName]: slice
  }) as Hub<Slice<R, C>>;
}
