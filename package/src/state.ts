import { BehaviorSubject } from 'rxjs';
import { Slice, State } from './interfaces';

/**
 * it stores the state of all routes on first level
 */
export const state: BehaviorSubject<State<any>> = new BehaviorSubject(null);

/**
 * Updates state via routes or children routes
 */
export function updateState<T, C = {}>(
  routeName: string,
  routes: Slice<T>
): State<Slice<T, C>> {
  const children = Object.keys(routes).reduce((acc, routeChildrenName) => {
    if (!routes[routeChildrenName].children) {
      return acc;
    }

    return { ...acc, ...routes[routeChildrenName].children };
  }, {});
  const hasChildren = Object.keys(children).length > 0;

  // tslint:disable-next-line
  return Object.assign({}, state.value, {
    [routeName]: hasChildren ? children : routes
  }) as State<Slice<T, C>>;
}
