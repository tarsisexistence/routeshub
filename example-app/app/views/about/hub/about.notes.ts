import { RootRoute, RoutesNotes } from '../../../../../package';

/**
 * Declares a type which contains
 * only route with root key
 */
export type AboutRoutes = RootRoute;

/**
 * Declares About' notes
 */
export const aboutNotes: RoutesNotes<AboutRoutes> = {
  root: {
    path: ''
  }
};
