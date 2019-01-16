import { BehaviorSubject } from 'rxjs';

export const state = new BehaviorSubject(null);

export function updateState<T>(branch: string, routes: T): T {
  const children = Object.keys(routes).reduce((acc, routeName) => {
    if (!routes[routeName].children) {
      return acc;
    }

    return { ...acc, ...routes[routeName].children };
  }, {});
  const hasChildren = Object.keys(children).length > 0;

  // tslint:disable-next-line
  return Object.assign({}, state.value, {
    [branch]: hasChildren ? children : routes
  });
}
