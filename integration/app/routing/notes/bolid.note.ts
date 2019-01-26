import { Root, RoutesNotes } from 'routeshub';

/**
 * Declares route that would be used
 * as navigator to the own module
 */
export const bolidRoute = {
  path: 'bolids',
  lazyPath: 'app/views/bolid/bolid.module#BolidModule'
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type BolidRoutes = Root;

/**
 * Declares routes of its own module
 */
export const bolidRoutes: RoutesNotes<BolidRoutes> = {
  root: {
    path: ''
  }
};
