import { BaseRoute, Route, Routes } from 'routeshub';

import { about } from './about.route';
import { automobile } from './automobile.route';
import { bike } from './bike.route';
import { bolid } from './bolid.route';

/**
 * Describes App children route
 */
export interface AppChildrenRoute extends BaseRoute {
  about: Route;
  automobile: Route;
  bike: Route;
  bolid: Route;
}

/**
 * Declares App children routes
 */
const appChildrenRoute: Routes<AppChildrenRoute> = {
  root: { path: '' },
  about,
  automobile,
  bike,
  bolid
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AppRoute = BaseRoute;

/**
 * Declares App route
 * with one 'root' key
 * and children in the body
 */
export const appRoute: Routes<AppRoute, AppChildrenRoute> = {
  root: {
    path: '',
    children: appChildrenRoute
  }
};
