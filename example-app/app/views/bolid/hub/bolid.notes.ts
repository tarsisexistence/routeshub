import { Note } from 'lib';

export interface BolidNotes {
  root: Note;
  year: Note;
}

export const BOLID_HUB_KEY = Symbol();
