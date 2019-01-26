import { RoutesNotes, Root } from 'routeshub';

/**
 * Declares route that would be used
 * as navigator to the own module
 */
export const automobileRoute = {
  path: 'automobiles',
  lazyPath: 'app/views/automobile/automobile.module#AutomobileModule'
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AutomobileRoutes = Root;

/**
 * Declares routes of its own module
 */
export const automobileRoutes: RoutesNotes<AutomobileRoutes> = {
  root: {
    path: ''
  }
};
