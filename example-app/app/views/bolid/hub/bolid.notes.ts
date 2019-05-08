import {
  rootNote,
  RootRoute,
  RouteNote,
  RoutesNotes
} from '../../../../../package';

/**
 * Declares a type which contains
 * only route with root key
 */
export interface BolidNotes extends RootRoute {
  year: RouteNote;
}

/**
 * Declares Bolid's notes
 */
export const bolidNotes: RoutesNotes<BolidNotes> = {
  ...rootNote,
  year: {
    path: ':year'
  }
};
