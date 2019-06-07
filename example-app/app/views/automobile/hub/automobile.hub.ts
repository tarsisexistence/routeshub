import { createFeature, createNote, RouteNote, Slice } from 'lib';
import { routes } from './automobile.routes';
import { appSlice } from '../../../routing/hub/app.hub';

export interface AutomobileNote {
  root: RouteNote;
}

export const automobileNote = createNote<AutomobileNote>(routes);

export const automobileSlice: Slice<AutomobileNote> = createFeature<
  AutomobileNote
>(appSlice.automobiles, automobileNote);
