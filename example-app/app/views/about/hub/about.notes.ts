import { RootRoute, RoutesNotes } from '../../../../../package';

/**
 * Declares a type which contains
 * only route with root key
 */
export type AboutRoutes = RootRoute;

/**
 * Declares of About module
 */
export const aboutNotes: RoutesNotes<AboutRoutes> = {
  root: {
    path: ''
  }
};
