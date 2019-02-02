import { RootRoute, RootRouteNote, RouteNote } from '../interfaces';

/**
 * sets note values
 */
export const setNote = <C = {}>(options: RouteNote<C>): RouteNote<C> => ({
  ...options
});

/**
 * portable shortcut for the RootRoute cases
 */
export const rootNote: RootRoute = {
  root: { path: '' }
};

/**
 * flexible shortcut for the RootRoute cases
 */
export const setRootNote = <C = {}>(
  options: RootRouteNote<C> = {} as RootRouteNote<C>
): RouteNote<C> => ({
  ...options,
  path: ''
});
