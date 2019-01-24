import { Describes, Root } from 'routeshub';

/**
 * Declares route that would be used
 * as navigator to the own module
 */
export const aboutRoute = {
  path: 'about',
  lazyPath: 'app/views/about/about.module#AboutModule'
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AboutRoutes = Root;

/**
 * Declares routes of its own module
 */
export const aboutRoutes: Describes<AboutRoutes> = {
  root: {
    path: ''
  }
};
