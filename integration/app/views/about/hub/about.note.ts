import { RootRoute, RoutesNotes } from 'routeshub';

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
