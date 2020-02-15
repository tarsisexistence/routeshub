import { Note } from 'routeshub';

export interface DetailsNotes {
  root: Note;
  info: Note;
}

export const DETAILS_NOTES_KEY = Symbol();
