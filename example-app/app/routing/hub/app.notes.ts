import { Note, Root } from 'lib';

/**
 * Describes App children routes
 */
export interface AppChildNotes extends Root {
  about: Note;
  car: Note;
}

/**
 * Describes App main routes
 */
export interface AppNotes {
  root: Note<AppChildNotes>;
}

/**
 * Declares identifier of module routes
 */
export const APP_HUB_KEY = Symbol();
