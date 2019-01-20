import { indexer } from './indexer';
import { Entity, Params, Routes, Structure } from '../interfaces';

export function entitify<T, C = {}>(
  parentEntity: Structure | null,
  routes: Routes<T, C | {}>
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
      routeName
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

function stateFn(params?: Params, ...rest: Params[]): string[] {
  if (!params) {
    return;
  }

  if (rest.length === 0) {
    return handleState(params, this.state);
  }

  const parameters = rest.length === 0 ? params : reduceParams(params, rest);

  return handleState(parameters, this.state);
}

const handleState = (params: Params, state?: string[]): string[] =>
  Object.keys(params).reduce(
    (accState: string[], param: string): string[] =>
      accState.map(
        (slice: string): string =>
          slice === `:${param}` ? params[param] : slice
      ),
    state
  );

const reduceParams = (params: Params, restParams: Params[]): Params =>
  restParams.reduce(
    (accParams: Params, param: Params): Params => ({
      ...accParams,
      ...param
    }),
    params
  );

function setNotEmptyPath(state: string[], path: string): string[] {
  return path !== '' ? [...state, path] : state;
}
