import { createFeature, createNote, RouteNote, Slice } from 'lib';
import { routes } from './bolid.routes';
import { appSlice } from '../../../routing/hub/app.hub';

export interface BolidNote {
  root: RouteNote;
  year: RouteNote;
}

export const bolidNote = createNote<BolidNote>(routes);

export const bolidSlice: Slice<BolidNote> = createFeature<BolidNote>(
  appSlice.bolids,
  bolidNote
);
