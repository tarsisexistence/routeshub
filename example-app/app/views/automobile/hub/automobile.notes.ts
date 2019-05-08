import { rootNote, RootRoute, RoutesNotes } from '../../../../../package';

/**
 * Declares a type which contains
 * only route with root key
 */
export type AutomobileNotes = RootRoute;

/**
 * Declares an Automobile' notes
 */
export const automobileNotes: RoutesNotes<AutomobileNotes> = rootNote;
