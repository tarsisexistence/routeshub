import { Describe, Describes, Root } from 'routeshub';

import { aboutRoute } from './about.describe';
import { automobileRoute } from './automobile.describe';
import { bikeRoute } from './bike.describe';
import { bolidRoute } from './bolid.describe';

/**
 * Describes App children route
 */
export interface AppChildrenRoutes extends Root {
  about: Describe;
  automobile: Describe;
  bike: Describe;
  bolid: Describe;
}

/**
 * Declares App children routes
 */
const appChildrenRoute: Describes<AppChildrenRoutes> = {
  root: { path: '' },
  about: aboutRoute,
  automobile: automobileRoute,
  bike: bikeRoute,
  bolid: bolidRoute
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AppRoutes = Root;

/**
 * Declares App route
 * with one 'root' key
 * and children in the body
 */
export const appRoutes: Describes<AppRoutes, AppChildrenRoutes> = {
  root: {
    path: '',
    children: appChildrenRoute
  }
};
