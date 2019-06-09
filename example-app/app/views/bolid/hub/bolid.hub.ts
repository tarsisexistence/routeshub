import { createFeature, createNote, Note, Slice } from 'lib';
import { routes } from './bolid.routes';
import { appSlice } from '../../../routing/hub';

export interface BolidNote {
  root: Note;
  year: Note;
}

export const bolidNote = createNote<BolidNote>(routes);

export const bolidSlice: Slice<BolidNote> = createFeature<BolidNote>(
  appSlice.bolids,
  bolidNote
);
