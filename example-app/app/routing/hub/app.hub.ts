import { createNote, createRoot, RootRoute, RouteNote, Slice } from 'lib';
import { routes } from './app.routes';

/**
 * Describes App children routes
 */
export interface AppChildrenNotes extends RootRoute {
  about: RouteNote;
  automobiles: RouteNote;
  bikes: RouteNote;
  bolids: RouteNote;
}

/**
 * Describes App main routes
 */
export interface AppNote {
  root: RouteNote<AppChildrenNotes>;
  notFound: RouteNote;
}

/**
 * declares App's note
 */
export const appNote = createNote<AppNote>(routes, { wildcard: 'notFound' });

/**
 * Creates stateful named App routes
 */
export const appSlice: Slice<AppNote, AppChildrenNotes> = createRoot<
  AppNote,
  AppChildrenNotes
>(appNote);
