import { RootRoute, RoutesNotes } from '../../../../../package';

/**
 * Declares a type which contains
 * only route with root key
 */
export type BikeNotes = RootRoute;

/**
 * Declares Bike' notes
 */
export const bikeNotes: RoutesNotes<BikeNotes> = {
  root: {
    path: ''
  }
};
