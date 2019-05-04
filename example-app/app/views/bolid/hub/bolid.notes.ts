import { RootRoute, RoutesNotes } from '../../../../../package';

/**
 * Declares a type which contains
 * only route with root key
 */
export type BolidNotes = RootRoute;

/**
 * Declares Bolid' notes
 */
export const bolidNotes: RoutesNotes<BolidNotes> = {
  root: {
    path: ''
  }
};
