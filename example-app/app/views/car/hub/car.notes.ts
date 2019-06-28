import { Note } from 'lib';

export interface CarNotes {
  root: Note;
  year: Note;
  details: Note;
}

export const CAR_HUB_KEY = Symbol();