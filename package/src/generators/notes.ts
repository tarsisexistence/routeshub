import { RootRoute, RootRouteNote, RouteNote } from '../interfaces';

/**
 * Generators aren't available for now
 *
 * Lazy routes supports only string literals
 */

/**
 * portable shortcut for the RootRoute cases
 */
export const rootNote: RootRoute = {
  root: { path: '' }
};

/**
 * flexible shortcut for the RootRoute cases
 */
const setRootNote = <C = {}>(
  options: RootRouteNote<C> = {} as RootRouteNote<C>
): RouteNote<C> => ({
  ...options,
  path: ''
});

/**
 * sets note values
 */
const setNote = <C = {}>(options: RouteNote<C>): RouteNote<C> => ({
  ...options
});
