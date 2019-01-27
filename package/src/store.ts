import { BehaviorSubject } from 'rxjs';
import { Slice, Store } from './interfaces';

/**
 * it stores the states of all routes on first level
 */
export const store: BehaviorSubject<Store<any>> = new BehaviorSubject(null);

/**
 * Updates state via routes or children routes
 */
export function nextStateValue<T, C = {}>(
  routeName: string,
  routes: Slice<T>
): Store<Slice<T, C>> {
  const entity = entitify<T>(routes);

  // tslint:disable-next-line
  return Object.assign({}, store.value, {
    [routeName]: entity
  }) as Store<Slice<T, C>>;
}

/**
 * Detects routes on children routes
 */
const entitify = <T>(routes: Slice<T>) =>
  Object.keys(routes).reduce((acc, routeName) => {
    if (!routes[routeName].children) {
      return { ...acc, [routeName]: routes[routeName] };
    }

    return { ...acc, ...routes[routeName].children };
  }, {});
