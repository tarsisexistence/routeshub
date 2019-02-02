import { Params } from '../interfaces';
import { setNotEmptyPath } from './path';

/**
 * Set state value based on parentSlice's state and current path
 */
export const setState = (parentSlice, path) =>
  parentSlice !== null
    ? setNotEmptyPath(parentSlice.state, path)
    : setNotEmptyPath(['/'], path);

/**
 * State function that takes input args and outputs dynamic state value
 */
export function stateFn(params?: Params, ...otherParams: Params[]): string[] {
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