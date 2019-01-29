import { indexer } from './indexer';
import { Params, RoutesNotes, Slice, Structure } from '../interfaces';

/**
 * Core function
 * Enhances basic and
 * generates unique routes
 */
export function enhance<T, C = {}>(
  parentSlice: Structure | null,
  routes: RoutesNotes<T, C | {}>
): Slice<T> {
  return Object.keys(routes).reduce((acc: any, routeName: string): Slice<T> => {
    const { children, lazyPath } = routes[routeName];
    let { path } = routes[routeName];
    const id = indexer();
    const parentId = parentSlice !== null ? parentSlice.id : null;

    if (checkMultiPath(path)) {
      path = splitPath(path);
    }

    const state =
      parentSlice !== null
        ? setNotEmptyPath(parentSlice.state, path)
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
        children: children !== undefined ? enhance(route, children) : null
      }
    };
  }, {});
}

/**
 * State function that takes input args and outputs dynamic state value
 */
function stateFn(params?: Params, ...otherParams: Params[]): string[] {
  if (!params) {
    return this.state;
  }

  const parameters =
    otherParams.length === 0 ? params : reduceParams(params, otherParams);

  return handleState(parameters, this.state);
}

/**
 * Replaces property with value
 * Helps stateFn generate dynamic values
 */
const handleState = (params: Params, state?: string[]): string[] =>
  Object.keys(params).reduce(
    (accState: string[], param: string): string[] =>
      accState.map(
        (slice: string): string =>
          slice === `:${param}` ? params[param] : slice
      ),
    state
  );

/**
 * Absorbs and gives out together params
 */
const reduceParams = (params: Params, restParams: Params[]): Params =>
  restParams.reduce(
    (accParams: Params, param: Params): Params => ({
      ...accParams,
      ...param
    }),
    params
  );

/**
 * Prevents to record empty state paths
 */
function setNotEmptyPath(state: string[], path: string): string[] {
  return path !== '' ? [...state, path] : state;
}

/**
 * Checks multi path in each path
 */
function checkMultiPath(path: string): boolean {
  const slashId = path ? path.indexOf('/') : -1;

  return slashId !== -1;
}

/**
 * Prevents to record multi path in state
 */
function splitPath(path: string): string[] {
  return path.split('/').filter((state: string) => !!state);
}
