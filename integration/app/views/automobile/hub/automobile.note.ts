import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AutomobileRoutes = RootRoute;

/**
 * Declares routes of its own module
 */
export const automobileNotes: RoutesNotes<AutomobileRoutes> = {
  root: {
    path: ''
  }
};
