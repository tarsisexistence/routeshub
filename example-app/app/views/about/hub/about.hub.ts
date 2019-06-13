import { Note } from 'lib';

/**
 * Describes About note which contains
 * only one route with root key
 */
export interface AboutNotes {
  root: Note;
}

/**
 * unique local hub key
 */
export const ABOUT_HUB_KEY = Symbol();
