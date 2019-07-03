import { Note } from 'lib';

export interface CarNotes {
  root: Note;
  year: Note;
}

export const CAR_NOTES_KEY = Symbol();
