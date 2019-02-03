import { RootRoute, RoutesNotes } from 'routeshub';

/**
 * Declares a type which contains
 * only route with root key
 */
export type BolidRoutes = RootRoute;

/**
 * Declares Bolid' notes
 */
export const bolidNotes: RoutesNotes<BolidRoutes> = {
  root: {
    path: ''
  }
};
