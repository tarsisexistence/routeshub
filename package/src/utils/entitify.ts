import { indexer } from './indexer';
import { Entity, Routes, StateParams, Structure } from '../interfaces';

export function entitify<T>(
  parentEntity: Structure | null,
  routes: Routes<any>
): Entity<T> {
  return Object.keys(routes).reduce((acc: any, routeName: string): Entity<
    T
  > => {
    const { path, children, lazyPath } = routes[routeName];
    const id = indexer();
    const parentId = parentEntity !== null ? parentEntity.id : null;
    const state =
      parentEntity !== null
        ? setNotEmptyPath(parentEntity.state, path)
        : setNotEmptyPath(['/'], path);

    const route = {
      id,
      parentId,
      state,
      stateFn,
      path,
      lazyPath,
      route: routeName
    };

    return {
      ...acc,
      [routeName]: {
        ...route,
        children: children !== undefined ? entitify(route, children) : null
      }
    };
  }, {});
}

function stateFn(params?: StateParams, ...rest: StateParams[]): string[] {
  if (!params) {
    return;
  }

  if (rest.length === 0) {
    return handleState(params, this.state);
  }

  const parameters = rest.length === 0 ? params : reduceParams(params, rest);

  return handleState(parameters, this.state);
}

const handleState = (params: StateParams, state?: string[]): string[] =>
  Object.keys(params).reduce(
    (theState: string[], param: string): string[] =>
      theState.map(
        (slice: string): string =>
          slice === `:${param}` ? params[param] : slice
      ),
    state
  );

const reduceParams = (
  params: StateParams,
  restParams: StateParams[]
): StateParams =>
  restParams.reduce(
    (acc: StateParams, param: StateParams): StateParams => ({
      ...acc,
      ...param
    }),
    params
  );

function setNotEmptyPath(state: string[], path: string): string[] {
  return path !== '' ? [...state, path] : state;
}
