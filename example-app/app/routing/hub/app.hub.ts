import { createNote, createRoot, Note, Root, Slice } from 'lib';
import { routes } from './app.routes';

/**
 * Describes App children routes
 */
export interface AppChildrenNote extends Root {
  about: Note;
  automobiles: Note;
  bikes: Note;
  bolids: Note;
}

/**
 * Describes App main routes
 */
export interface AppNote extends Root<AppChildrenNote> {
  notFound: Note;
}

/**
 * declares App's note
 */
export const appNote = createNote<AppNote>(routes, { wildcard: 'notFound' });

/**
 * Creates stateful named App routes
 */
export const appSlice: Slice<AppNote, AppChildrenNote> = createRoot<
  AppNote,
  AppChildrenNote
>(appNote);
