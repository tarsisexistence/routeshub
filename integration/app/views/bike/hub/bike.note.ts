import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type BikeRoutes = RootRoute;

/**
 * Declares routes of its own module
 */
export const bikeNotes: RoutesNotes<BikeRoutes> = {
  root: {
    path: ''
  }
};
