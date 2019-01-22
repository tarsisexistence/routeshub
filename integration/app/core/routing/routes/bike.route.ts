import { BaseRoute, Routes } from 'routeshub';

/**
 * Declares route that would be used
 * as navigator to the own module
 */
export const bike = {
  path: 'bikes',
  lazyPath: 'app/views/bike/bike.module#BikeModule'
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type BikeRoute = BaseRoute;

/**
 * Declares routes of its own module
 */
export const bikeRoute: Routes<BikeRoute> = {
  root: {
    path: ''
  }
};
