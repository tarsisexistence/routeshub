import { Note, Root } from 'lib';

/**
 * Describes App children routes
 */
export interface AppChildNotes extends Root {
  about: Note;
  automobiles: Note;
  bikes: Note;
  bolids: Note;
}

/**
 * Describes App main routes
 */
export interface AppNotes {
  root: Note<AppChildNotes>;
  notFound: Note;
}

export const APP_HUB_KEY = Symbol();
