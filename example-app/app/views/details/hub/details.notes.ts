import { Note } from 'lib';

/**
 * Describes About note which contains
 * only one route with root key
 */
export interface DetailsNotes {
  root: Note;
}

/**
 * unique local hubs key
 */
export const DETAILS_HUB_KEY = Symbol();
