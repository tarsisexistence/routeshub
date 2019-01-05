import { indexer } from './indexer';
import { Entity, Routes, StateParams, Structure } from '../';

export function entitify<T>(
  parentEntity: Structure | null,
  routes: Routes<any>
): Entity<T> {
  return Object.keys(routes).reduce((acc: any, route: string): Entity<T> => {
    const { path, lazyPath } = routes[route];

    return {
      ...acc,
      [route]: {
        id: indexer(),
        parentId: parentEntity !== null ? parentEntity.id : null,
        state:
          parentEntity !== null ? [...parentEntity.state, path] : ['/', path],
        stateFn,
        path,
        lazyPath,
        route
      }
    };
  }, {});
}

function stateFn(params?: StateParams, ...rest: StateParams[]): string[] {
  // TODO: memoize
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
