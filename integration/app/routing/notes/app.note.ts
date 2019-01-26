import { Root, RouteNote, RoutesNotes } from 'routeshub';

import { aboutRoute } from './about.note';
import { automobileRoute } from './automobile.note';
import { bikeRoute } from './bike.note';
import { bolidRoute } from './bolid.note';

/**
 * Describes App children route
 */
export interface AppChildrenRoutes extends Root {
  about: RouteNote;
  automobile: RouteNote;
  bike: RouteNote;
  bolid: RouteNote;
}

/**
 * Declares App children routes
 */
const appChildrenRoute: RoutesNotes<AppChildrenRoutes> = {
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
export const appRoutes: RoutesNotes<AppRoutes, AppChildrenRoutes> = {
  root: {
    path: '',
    children: appChildrenRoute
  }
};
