import { createFeature, createNote, RouteNote, Slice } from 'lib';
import { routes } from './bike.routes';
import { appSlice } from '../../../routing/hub/app.hub';

export interface BikeNote {
  root: RouteNote;
}

export const bikeNote = createNote<BikeNote>(routes);

export const bikeSlice: Slice<BikeNote> = createFeature<BikeNote>(
  appSlice.bikes,
  bikeNote
);
