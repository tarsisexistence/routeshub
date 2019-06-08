import { createFeature, createNote, Note, Slice } from 'lib';
import { routes } from './automobile.routes';
import { appSlice } from '../../../routing/hub/app.hub';

export interface AutomobileNote {
  root: Note;
}

export const automobileNote = createNote<AutomobileNote>(routes);

export const automobileSlice: Slice<AutomobileNote> = createFeature<
  AutomobileNote
>(appSlice.automobiles, automobileNote);
