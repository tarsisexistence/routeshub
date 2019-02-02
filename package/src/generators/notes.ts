import { RootRoute, RouteNote } from '../interfaces';

/**
 * sets note values
 */
export const setNote = (options: RouteNote): RouteNote => ({ ...options });

/**
 * portable shortcut for the RootRoute cases
 */
export const rootNote: RootRoute = {
  root: { path: '' }
};

/**
 * flexible shortcut for the RootRoute cases
 */
export const setRootNote = (
  options: RouteNote = {} as RouteNote
): RouteNote => ({
  ...options,
  path: ''
});
