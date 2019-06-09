import { createFeature, createNote, Root, Slice } from 'lib';
import { routes } from './bike.routes';
import { appSlice } from '../../../routing/hub';

export type BikeNote = Root;

export const bikeNote = createNote<BikeNote>(routes);

export const bikeSlice: Slice<BikeNote> = createFeature<BikeNote>(
  appSlice.bikes,
  bikeNote
);
