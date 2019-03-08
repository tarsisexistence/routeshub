import { BehaviorSubject } from 'rxjs';

import { Hub, InternalStructure, Slice } from './interfaces';

/**
 * stores routes states at the same level
 */
export const hub: BehaviorSubject<Hub<any>> = new BehaviorSubject(null);

/**
 * refreshes children parent target
 * because of replacing them with a parent node
 */
function refreshChildren<R, C>(parent: InternalStructure<C>): Slice<C> {
  const children: Slice<C> = parent.children;
  const inheritorId: number = parent.id + 1;
  const namesake: string = Object.keys(children).find(
    (routeName: string) => children[routeName].id === inheritorId
  );

  return Object.keys(children).reduce(
    (acc: Slice<C>, routeName: string): Slice<C> => {
      const parentId =
        children[routeName].id === inheritorId
          ? parent.parentId
          : children[namesake].id;
      const route = { ...children[routeName], parentId };

      /* tslint:disable:prefer-object-spread */
      /* https://github.com/Microsoft/TypeScript/issues/10727 */
      return { ...(acc as object), [routeName]: route } as Slice<C>;
    },
    {} as Slice<C>
  );
}

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

  // tslint:disable-next-line
  return Object.assign({}, hub.value, {
    [routeName]: slice
  }) as Hub<Slice<R, C>>;
}
