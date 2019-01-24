import { Describes, Root } from 'routeshub';

/**
 * Declares route that would be used
 * as navigator to the own module
 */
export const automobile = {
  path: 'automobiles',
  lazyPath: 'app/views/automobile/automobile.module#AutomobileModule'
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AutomobileRoute = Root;

/**
 * Declares routes of its own module
 */
export const automobileRoute: Describes<AutomobileRoute> = {
  root: {
    path: ''
  }
};
