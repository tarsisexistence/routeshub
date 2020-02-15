import { Note, Root } from 'routeshub';

export interface UsersChildNotes extends Root {
  id: Note;
  profile: Note;
}

export interface UsersNotes {
  users: Note;
}

export const USERS_NOTES_KEY = Symbol();
