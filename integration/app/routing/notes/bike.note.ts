import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares route that would be used
 * as navigator to the own module
 */
export const bikeRoute = {
  path: 'bikes',
  lazyPath: 'app/views/bike/bike.module#BikeModule'
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type BikeRoutes = RootRoute;

/**
 * Declares routes of its own module
 */
export const bikeRoutes: RoutesNotes<BikeRoutes> = {
  root: {
    path: ''
  }
};
