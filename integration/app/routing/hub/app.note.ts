import { RootRoute, RouteNote, RoutesNotes } from 'routeshub';

import { appChildrenNotes, AppChildrenRoutes } from './app-children.note';

/**
 * Declares a type which contains
 * root and notFound routes
 */
export interface AppRoutes extends RootRoute {
  notFound: RouteNote;
}

/**
 * Declares App' notes
 */
export const appNotes: RoutesNotes<AppRoutes, AppChildrenRoutes> = {
  root: {
    path: '',
    children: appChildrenNotes
  },
  notFound: {
    path: '**'
  }
};
