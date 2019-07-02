import { Note } from 'lib';

export interface DetailsNotes {
  root: Note;
  info: Note;
}

export const DETAILS_HUB_KEY = Symbol();
