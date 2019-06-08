import { createNote, createRoot, Note, Root, Slice } from 'lib';
import { routes } from './app.routes';

/**
 * Describes App children routes
 */
export interface AppChildrenNotes extends Root {
  about: Note;
  automobiles: Note;
  bikes: Note;
  bolids: Note;
}

/**
 * Describes App main routes
 */
export interface AppNote extends Root<AppChildrenNotes> {
  notFound: Note;
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
