import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares a type which contains
 * only route with root key
 */
export type AutomobileRoutes = RootRoute;

/**
 * Declares an Automobile' notes
 */
export const automobileNotes: RoutesNotes<AutomobileRoutes> = {
  root: {
    path: ''
  }
};
