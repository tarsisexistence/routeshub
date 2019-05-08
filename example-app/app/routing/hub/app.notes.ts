import { RootRoute, RouteNote, RoutesNotes } from '../../../../package';

import { appChildrenNotes, AppChildrenNotes } from './app-children.notes';

/**
 * Declares a type which contains
 * root and notFound routes
 */
export interface AppNotes extends RootRoute {
  notFound: RouteNote;
}

/**
 * Declares App' notes
 */
export const appNotes: RoutesNotes<AppNotes, AppChildrenNotes> = {
  root: {
    path: '',
    children: appChildrenNotes
  },
  notFound: {
    path: '**'
  }
};
