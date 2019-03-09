import { Params } from '../interfaces';
import { setNotEmptyPath } from './path';

/**
 * Assigns a value based on the parent's  state and a current path
 */
export const setState = (parentSlice, path) => {
  if (path.includes('*')) {
    return [path];
  }

  return parentSlice !== null
    ? setNotEmptyPath(parentSlice.state, path)
    : setNotEmptyPath(['/'], path);
};

/**
 * Absorbs and gives params out together
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
 * Replaces property with a value
 * Helps stateFn generating dynamic values
 */
const handleState = (params: Params, state: string[] = []): string[] =>
  Object.keys(params).reduce(
    (accState: string[], param: string): string[] =>
      accState.map(
        (slice: string): string =>
          slice === `:${param}` ? params[param] : slice
      ),
    state
  );

/**
 * Supports dynamic paths
 */
export function stateFn(
  state,
  params?: Params,
  ...otherParams: Params[]
): string[] {
  if (!params) {
    return state;
  }

  const parameters =
    otherParams.length === 0 ? params : reduceParams(params, otherParams);

  return handleState(parameters, state);
}
