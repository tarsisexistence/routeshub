import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AboutRoutes = RootRoute;

/**
 * Declares routes of its own module
 */
export const aboutNote: RoutesNotes<AboutRoutes> = {
  root: {
    path: ''
  }
};
