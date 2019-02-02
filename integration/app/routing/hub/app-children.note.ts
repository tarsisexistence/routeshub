import { rootNote, RootRoute, RouteNote, RoutesNotes } from 'routeshub';

const aboutNote: RouteNote = {
  path: 'about',
  lazyPath: 'app/views/about/about.module#AboutModule'
};
const automobileNote: RouteNote = {
  path: 'automobiles',
  lazyPath: 'app/views/automobile/automobile.module#AutomobileModule'
};
const bikeNote: RouteNote = {
  path: 'bikes',
  lazyPath: 'app/views/bike/bike.module#BikeModule'
};
const bolidNote: RouteNote = {
  path: 'bolids',
  lazyPath: 'app/views/bolid/bolid.module#BolidModule'
};

/**
 * Describes App children route
 */

export interface AppChildrenRoutes extends RootRoute {
  about: RouteNote;
  automobile: RouteNote;
  bike: RouteNote;
  bolid: RouteNote;
}

/**
 * Declares App children routes
 */
export const appChildrenNotes: RoutesNotes<AppChildrenRoutes> = {
  ...rootNote,
  about: aboutNote,
  automobile: automobileNote,
  bike: bikeNote,
  bolid: bolidNote
};
