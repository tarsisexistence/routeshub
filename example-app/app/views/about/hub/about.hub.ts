import { createFeature, createNote, Note, Slice } from 'lib';
import { routes } from './about.routes';
import { appSlice } from '../../../routing/hub/app.hub';

/**
 * Describes About note which contains
 * only one route with root key
 */
export interface AboutNote {
  root: Note;
}

/**
 * Declares a note of About module
 */
export const aboutNote = createNote<AboutNote>(routes);

/**
 * Creates a feature slice
 */
export const aboutSlice: Slice<AboutNote> = createFeature<AboutNote>(
  appSlice.about,
  aboutNote
);
