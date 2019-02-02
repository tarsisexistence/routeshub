import { RootRoute, RouteNote, RoutesNotes, setRootNote } from 'routeshub';

import { appChildrenNotes, AppChildrenRoutes } from './app-children.note';

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export interface AppRoutes extends RootRoute {
  notFound: RouteNote;
}

/**
 * Declares App route
 * with one 'root' key
 * and children in the body
 */
export const appNotes: RoutesNotes<AppRoutes, AppChildrenRoutes> = {
  root: setRootNote({
    children: appChildrenNotes
  }),
  notFound: {
    path: '**'
  }
};
