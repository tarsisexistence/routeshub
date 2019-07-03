import { Note } from 'lib';

export interface DetailsNotes {
  root: Note;
  info: Note;
}

export const DETAILS_NOTES_KEY = Symbol();
