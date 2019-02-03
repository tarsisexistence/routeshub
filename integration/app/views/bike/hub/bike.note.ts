import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares a type which contains
 * only route with root key
 */
export type BikeRoutes = RootRoute;

/**
 * Declares Bike' notes
 */
export const bikeNotes: RoutesNotes<BikeRoutes> = {
  root: {
    path: ''
  }
};
