import {
  rootNote,
  RootRoute,
  RouteNote,
  RoutesNotes
} from '../../../../package';

const aboutNote: RouteNote = {
  path: 'about',
  lazy: 'app/views/about/about.module#AboutModule'
};
const automobileNote: RouteNote = {
  path: 'automobiles',
  lazy: 'app/views/automobile/automobile.module#AutomobileModule'
};
const bikeNote: RouteNote = {
  path: 'bikes',
  lazy: 'app/views/bike/bike.module#BikeModule'
};
const bolidNote: RouteNote = {
  path: 'bolids',
  lazy: 'app/views/bolid/bolid.module#BolidModule'
};

/**
 * Describes App children route
 */

export interface AppChildrenNotes extends RootRoute {
  about: RouteNote;
  automobile: RouteNote;
  bike: RouteNote;
  bolid: RouteNote;
}

/**
 * Declares App children routes
 */
export const appChildrenNotes: RoutesNotes<AppChildrenNotes> = {
  ...rootNote,
  about: aboutNote,
  automobile: automobileNote,
  bike: bikeNote,
  bolid: bolidNote
};
